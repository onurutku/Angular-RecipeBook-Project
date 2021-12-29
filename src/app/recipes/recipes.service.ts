import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      122335,
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/bean-recipes-1.jpg',
      'Description for 122335',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      335642,
      'A Test Recipe2',
      'This is simply a test2',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/bean-recipes-1.jpg',
      'Description for 335642',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];
  constructor(private shoppingList: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    for (let recipe of this.recipes) {
      if (recipe.id === id) {
        return recipe;
      }
    }
  }
  updateRecipes(id: number, newRecipe: Recipe) {
    let index: number;
    index = this.getRecipes().indexOf(this.getRecipe(id));
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingList.addIngredients(ingredients);
  }
  deleteRecipe(clickedId: number) {
    const index = this.recipes.indexOf(this.getRecipe(clickedId));
    if (this.recipes.length === 1) {
      this.recipes = [];
    } else {
      this.recipes.splice(index, 1);
    }
    this.recipesChanged.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
}
