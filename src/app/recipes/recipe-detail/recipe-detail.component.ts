import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
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

  constructor(private recipesServices: RecipesService, private recipeToShoppingList:ShoppingListService) {
    this.recipesServices.recipeSelected.subscribe((selectedId) => {
      this.clickedId = selectedId;
    });
  }
  toShoppingList(){
    this.recipesServices.addIngredientsToShoppingList(this.recipeFrom.ingredients)
  }
}
