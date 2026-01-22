import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IngredientPickerComponent } from '../../../components/ingredient-picker/ingredient-picker.component';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule, DropdownModule, InputTextarea, IngredientPickerComponent],
  templateUrl: './recipe-add.page.html',
  styleUrls: ['./recipe-add.page.scss']
})
export class RecipeAddPage {
  form!: FormGroup;

  difficulties = Array.from({ length: 10 }, (_, i) => i + 1);

  ingredients = signal<Array<{ ingredient: any | null; amount: number; unit: string }>>([]);

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
    this.ingredients.set([...list, event]);
  }

  get totalTime() {
    const prep = Number(this.form.get('prepTime')!.value) || 0;
    const cook = Number(this.form.get('cookTime')!.value) || 0;
    return prep + cook;
  }

  submit() {
    if (this.form.invalid) return;
    const payload = { ...this.form.value, totalTime: this.totalTime, ingredients: this.ingredients() };
    console.log('submit payload', payload);
    // TODO: call recipe service to create recipe
  }
}
