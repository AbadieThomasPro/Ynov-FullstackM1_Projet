import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import type { Recipe } from '../../store/recipe/recipe.service';
import type { Ingredient } from '../../store/ingredient/ingredient.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() recipe?: Recipe;
  @Input() ingredient?: Ingredient;
  @Input() quantity?: string; // e.g., "20 g"
  @Input() showDelete = false;
  @Input() isSelected = false;
  @Output() clickCard = new EventEmitter<string>();
  @Output() select = new EventEmitter<any>();
  @Output() delete = new EventEmitter<void>();

  get imageUrl(): string | null {
    return this.recipe?.avatarurl || this.ingredient?.avatarurl || null;
  }

  get title(): string {
    return this.recipe?.name || this.ingredient?.name || '';
  }

  onClick() {
    if (this.recipe) {
      this.clickCard.emit(this.recipe.recipeid);
    } else if (this.ingredient) {
      this.select.emit(this.ingredient);
    }
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit();
  }
}
