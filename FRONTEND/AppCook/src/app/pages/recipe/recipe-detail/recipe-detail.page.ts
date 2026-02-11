import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RecipeService, Recipe } from '../../../store/recipe/recipe.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.dev';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss']
})
export class RecipeDetailPage implements OnInit {
  recipe = signal<Recipe | null>(null);
  ingredients = signal<any[]>([]);
  steps = signal<any[]>([]);
  images = signal<any[]>([]);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading.set(false);
      return;
    }

    this.loadRecipeDetails(id);
  }

  loadRecipeDetails(recipeId: string) {
    this.loading.set(true);

    forkJoin({
      recipe: this.recipeService.getById(recipeId),
      ingredients: this.http.get<any[]>(`${environment.api}/recipe/${recipeId}/ingredients`),
      steps: this.http.get<any[]>(`${environment.api}/recipe/${recipeId}/steps`),
      images: this.http.get<any[]>(`${environment.api}/recipe/${recipeId}/images`)
    }).subscribe({
      next: (result) => {
        this.recipe.set(result.recipe);
        this.ingredients.set(result.ingredients);
        this.steps.set(result.steps);
        this.images.set(result.images);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading recipe details:', err);
        this.loading.set(false);
      }
    });
  }

  getStepImage(stepId: string) {
    return this.images().find(img => img.stepid === stepId);
  }

  goBack() {
    this.router.navigate(['/recipes']);
  }
}
