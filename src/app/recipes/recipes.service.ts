import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      122335,
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/bean-recipes-1.jpg',
      'Description for 122335',
      [
        new Ingredient('Meat',1),
        new Ingredient('French Fries',20)
      ]
    ),
    new Recipe(
      335642,
      'A Test Recipe2',
      'This is simply a test2',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/bean-recipes-1.jpg',
      'Description for 335642',
      [
        new Ingredient('Buns',2),
        new Ingredient('Meat',1)
      ]
    ),
  ];
  constructor(private shoppingList:ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingList.addIngredients(ingredients);
  }
}
