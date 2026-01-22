import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Recipe } from '../../store/recipe/recipe.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() recipe!: Recipe;
  @Output() clickCard = new EventEmitter<string>();

  onClick() {
    this.clickCard.emit(this.recipe.recipeid);
  }
}
