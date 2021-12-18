import { Component, Input } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  clickedId: Recipe;
  @Input() recipeFrom: any;

  constructor(private recipesServices: RecipesService) {
    this.recipesServices.recipeSelected.subscribe((selectedId) => {
      this.clickedId = selectedId;
    });
  }
}
