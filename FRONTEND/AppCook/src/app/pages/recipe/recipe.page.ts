import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RecipeService, Recipe } from '../../store/recipe/recipe.service';
import { CardComponent } from '../../components/card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, CardComponent],
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss']
})
export class RecipePage {
  recipes = signal<Recipe[]>([]);
  query = signal('');
  filtered = signal<Recipe[]>([]);

  constructor(private recipeService: RecipeService, private router: Router) {
    // load data once
    this.recipeService.getAll().subscribe(r => {
      this.recipes.set(r);
      this.filtered.set(r);
    });

    effect(() => {
      const q = this.query();
      const list = this.recipes();
      if (!q) {
        this.filtered.set(list);
      } else {
        const lower = q.toLowerCase();
        this.filtered.set(list.filter(it => it.name.toLowerCase().includes(lower)));
      }
    });
  }

  onCardClick(id: string) {
    this.router.navigate(['/recipes', id]);
  }

  onAdd() {
    this.router.navigate(['/recipes/add']);
  }

  onQueryChange(value: string) {
    this.query.set(value);
  }
}
