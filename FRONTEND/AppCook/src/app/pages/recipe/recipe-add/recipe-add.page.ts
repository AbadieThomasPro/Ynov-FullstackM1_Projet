import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { IngredientPickerComponent } from '../../../components/ingredient-picker/ingredient-picker.component';
import { CardComponent } from '../../../components/card/card.component';
import { Store } from '@ngxs/store';
import { AddRecipeIngredients } from '../../../store/recipe/recipe.actions';
import { AddRecipeSteps } from '../../../store/step/step.actions';
import { AddRecipeImages } from '../../../store/image/image.actions';
import { StepState } from '../../../store/step/step.state';
import { RecipeService } from '../../../store/recipe/recipe.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, InputNumberModule, ButtonModule, DropdownModule, InputTextarea, CardModule, FileUploadModule, IngredientPickerComponent, CardComponent],
  templateUrl: './recipe-add.page.html',
  styleUrls: ['./recipe-add.page.scss']
})
export class RecipeAddPage {
  form!: FormGroup;

  difficulties = Array.from({ length: 10 }, (_, i) => i + 1);

  ingredients = signal<Array<{ ingredientId: string; ingredient: any; quantity: number; unity: string }>>([]);
  steps = signal<Array<{ step: number; text: string; image?: string; alt_text?: string }>>([{ step: 1, text: '' }]);
  stepImages = signal<Array<{ step: number; image: string; alt_text: string }>>([]);

  constructor(
    private fb: FormBuilder, 
    private store: Store, 
    private router: Router,
    private recipeService: RecipeService
  ) {
    // initialize with validators now that fb is available
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      servings: [1, [Validators.required, Validators.min(1)]],
      prepTime: [0, [Validators.required, Validators.min(0)]],
      cookTime: [0],
      difficulty: [5, [Validators.required]]
    });
  }

  onAddIngredient(event: { ingredient: any | null; amount: number; unit: string }) {
    const list = this.ingredients();
    // Transform to match backend structure: {ingredientId, ingredient, quantity, unity}
    if (event.ingredient) {
      this.ingredients.set([...list, {
        ingredientId: event.ingredient.ingredientid,
        ingredient: event.ingredient,
        quantity: event.amount,
        unity: event.unit
      }]);
    }
  }

  get totalTime() {
    const prep = Number(this.form.get('prepTime')!.value) || 0;
    const cook = Number(this.form.get('cookTime')!.value) || 0;
    return prep + cook;
  }

  removeIngredient(index: number) {
    const list = this.ingredients();
    this.ingredients.set(list.filter((_, i) => i !== index));
  }

  addStep() {
    const currentSteps = this.steps();
    const newStep = { step: currentSteps.length + 1, text: '' };
    this.steps.set([...currentSteps, newStep]);
  }

  removeStep(index: number) {
    const currentSteps = this.steps();
    const stepNumber = currentSteps[index].step;
    
    // Remove image if exists
    const currentImages = this.stepImages();
    const filteredImages = currentImages.filter(img => img.step !== stepNumber);
    
    const filtered = currentSteps.filter((_, i) => i !== index);
    // Renumber steps
    const renumbered = filtered.map((step, i) => ({ 
      step: i + 1, 
      text: step.text,
      image: step.image,
      alt_text: step.alt_text
    }));
    
    // Renumber images
    const renumberedImages = filteredImages.map(img => {
      const newStepNumber = renumbered.findIndex(s => s.step === img.step) + 1;
      return { ...img, step: newStepNumber };
    });
    
    this.steps.set(renumbered);
    this.stepImages.set(renumberedImages);
  }

  onImageUpload(event: any, stepNumber: number) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const currentImages = this.stepImages();
        const existingIndex = currentImages.findIndex(img => img.step === stepNumber);
        
        const newImage = {
          step: stepNumber,
          image: e.target.result,
          alt_text: file.name
        };
        
        if (existingIndex >= 0) {
          // Replace existing image
          const updated = [...currentImages];
          updated[existingIndex] = newImage;
          this.stepImages.set(updated);
        } else {
          // Add new image
          this.stepImages.set([...currentImages, newImage]);
        }
        
        // Update step with image info
        const currentSteps = this.steps();
        const stepIndex = currentSteps.findIndex(s => s.step === stepNumber);
        if (stepIndex >= 0) {
          const updatedSteps = [...currentSteps];
          updatedSteps[stepIndex] = {
            ...updatedSteps[stepIndex],
            image: e.target.result,
            alt_text: file.name
          };
          this.steps.set(updatedSteps);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeStepImage(stepNumber: number) {
    const currentImages = this.stepImages();
    this.stepImages.set(currentImages.filter(img => img.step !== stepNumber));
    
    // Remove from step
    const currentSteps = this.steps();
    const stepIndex = currentSteps.findIndex(s => s.step === stepNumber);
    if (stepIndex >= 0) {
      const updatedSteps = [...currentSteps];
      delete updatedSteps[stepIndex].image;
      delete updatedSteps[stepIndex].alt_text;
      this.steps.set(updatedSteps);
    }
  }

  getStepImage(stepNumber: number) {
    return this.stepImages().find(img => img.step === stepNumber);
  }

  submit() {
    if (this.form.invalid) return;
    
    //Récupérer userId du localStorage
    const userId = localStorage.getItem('userid');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    //Step 1: Crée la recette
    const recipePayload = {
      name: this.form.value.name,
      userid: userId,
      description: this.form.value.description,
      servings: this.form.value.servings,
      preperationTime: this.form.value.prepTime,
      cookTime: this.form.value.cookTime,
      totalTime: this.totalTime,
      difficulty: this.form.value.difficulty
    };

    console.log('Creating recipe...', recipePayload);

    this.recipeService.create(recipePayload).pipe(
      switchMap((recipe: any) => {
        const recipeId = recipe.recipeid;
        console.log('Recipe created with ID:', recipeId);

        if (!recipeId) {
          throw new Error('Recipe ID not returned');
        }

        //Step 2: Ajouter les ingrédients
        const ingredientsPayload = this.ingredients().map((ing, index) => ({
          ingredientId: ing.ingredientId,
          quantity: ing.quantity,
          quantityUnit: ing.unity,
          order: index,
          optional: false
        }));

        console.log('Adding ingredients...', ingredientsPayload);
        return this.store.dispatch(new AddRecipeIngredients(recipeId, ingredientsPayload)).pipe(
          switchMap(() => {
            //Step 3: Ajouter les étapes
            const stepsPayload = this.steps().map((step, index) => ({
              stepIndex: index + 1,
              description: step.text,
              duration: 5, // Par défault pour l'instant 5 minutes
              tips: null
            }));

            console.log('Adding steps...', stepsPayload);
            return this.store.dispatch(new AddRecipeSteps(recipeId, stepsPayload)).pipe(
              switchMap(() => {
                // Get the created steps from the state
                const stepsResult = this.store.selectSnapshot(StepState.createdSteps);
                console.log('Steps result from state:', stepsResult);
                
                //Step 4: Ajouter images si il y en a
                const images = this.stepImages();
                if (images.length === 0) {
                  console.log('No images to add');
                  return Promise.resolve({ recipeId });
                }

                // Map stepIndex to stepId from the backend response
                const imagesPayload = images.map((img) => {
                  // Find the corresponding stepId from the steps result
                  const stepResult = stepsResult.find((s: any) => s.stepIndex === img.step);
                  
                  return {
                    stepId: stepResult?.stepId || null,
                    image: { data: img.image }, // JSONB format
                    order: img.step - 1, // Use step number - 1 as order
                    alt_text: img.alt_text
                  };
                });

                console.log('Adding images...', imagesPayload);
                return this.store.dispatch(new AddRecipeImages(recipeId, imagesPayload)).pipe(
                  tap(() => ({ recipeId }))
                );
              })
            );
          })
        );
      }),
      tap((result: any) => {
        console.log('Recipe creation complete!', result);
      })
    ).subscribe({
      next: () => {
        console.log('Recipe created successfully!');
        alert('Recette créée avec succès !');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error creating recipe:', err);
        alert('Erreur lors de la création de la recette');
      }
    });
  }
}
