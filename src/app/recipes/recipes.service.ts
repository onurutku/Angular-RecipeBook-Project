import { EventEmitter, Injectable } from '@angular/core';
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
      'Ingredients for 122335'
    ),
    new Recipe(
      335642,
      'A Test Recipe2',
      'This is simply a test2',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/bean-recipes-1.jpg',
      'Description for 335642',
      'Ingredients for 335642'
    ),
  ];
  constructor() {}
  getRecipes() {
    return this.recipes.slice();
  }
}
