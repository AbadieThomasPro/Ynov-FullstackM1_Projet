import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IngredientService, Ingredient } from '../../store/ingredient/ingredient.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ingredient-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './ingredient-picker.component.html',
  styleUrls: ['./ingredient-picker.component.scss']
})
export class IngredientPickerComponent {
  @Output() add = new EventEmitter<{ ingredient: Ingredient | null; amount: number; unit: string }>();

  form: FormGroup;
  results = signal<Ingredient[]>([]);
  loading = signal(false);

  units = ['g', 'unit', 'cl', 'ml'];

  constructor(private fb: FormBuilder, private ingredientService: IngredientService) {
    this.form = this.fb.group({
      q: [''],
      amount: [1],
      unit: ['g']
    });

    // listen to q changes
    this.form.get('q')!.valueChanges.pipe(
      debounceTime(300),
      switchMap((v: string) => {
        if (!v || v.length < 2) return Promise.resolve([] as Ingredient[]);
        this.loading.set(true);
        return this.ingredientService.search(v);
      })
    ).subscribe({
      next: (res) => {
        this.results.set(res || []);
        this.loading.set(false);
      },
      error: () => {
        this.results.set([]);
        this.loading.set(false);
      }
    });
  }

  async onSearch() {
    const q = this.form.get('q')!.value;
    if (!q || q.length < 2) return;
    this.loading.set(true);
    this.ingredientService.search(q).subscribe({
      next: (res) => { this.results.set(res || []); this.loading.set(false); },
      error: () => { this.results.set([]); this.loading.set(false); }
    });
  }

  selectIngredient(ing: Ingredient) {
    // set q to ingredient name
    this.form.get('q')!.setValue(ing.name);
  }

  confirmAdd() {
    const name = this.form.get('q')!.value;
    const ingredient = this.results().find(r => r.name === name) || null;
    const amount = Number(this.form.get('amount')!.value) || 0;
    const unit = this.form.get('unit')!.value || 'g';
    this.add.emit({ ingredient, amount, unit });
    // reset amount but keep q
    this.form.get('amount')!.setValue(1);
  }
}
