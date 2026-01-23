import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { IngredientPickerComponent } from '../../../components/ingredient-picker/ingredient-picker.component';
import { CardComponent } from '../../../components/card/card.component';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, InputNumberModule, ButtonModule, DropdownModule, InputTextarea, CardModule, IngredientPickerComponent, CardComponent],
  templateUrl: './recipe-add.page.html',
  styleUrls: ['./recipe-add.page.scss']
})
export class RecipeAddPage {
  form!: FormGroup;

  difficulties = Array.from({ length: 10 }, (_, i) => i + 1);

  ingredients = signal<Array<{ ingredient: any; quantity: number; unity: string }>>([]);
  steps = signal<Array<{ step: number; text: string }>>([{ step: 1, text: '' }]);

  constructor(private fb: FormBuilder) {
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
    // Transform to match backend structure: {ingredient, quantity, unity}
    this.ingredients.set([...list, {
      ingredient: event.ingredient,
      quantity: event.amount,
      unity: event.unit
    }]);
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
    const filtered = currentSteps.filter((_, i) => i !== index);
    // Renumber steps
    const renumbered = filtered.map((step, i) => ({ step: i + 1, text: step.text }));
    this.steps.set(renumbered);
  }

  submit() {
    if (this.form.invalid) return;
    const payload = { 
      ...this.form.value, 
      totalTime: this.totalTime, 
      ingredients: this.ingredients(),
      steps: this.steps()
    };
    console.log('submit payload', payload);
    // TODO: call recipe service to create recipe
  }
}
