import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];
  tutorial: AngularFireObject<any>;
  constructor(
    private shoppingList: ShoppingListService,
    private http: HttpClient,
    private router: Router,
    private firebase: AngularFireDatabase
  ) {}
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingList.addIngredients(ingredients);
  }
  deleteRecipe(sendedId: string) {
    this.firebase
      .object('recipes/' + sendedId)
      .remove()
      .then(() => {
        this.router.navigate(['/recipes']).then(() => {
          window.location.reload();
        });
      });
  }
  updateRecipes(id: string, recipe: Recipe) {
    this.firebase
      .object('recipes/' + id)
      .set({
        desc: recipe.desc,
        description: recipe.description,
        imagePath: recipe.imagePath,
        name: recipe.name,
        ingredients: recipe.ingredients,
      })
      .then(() => {
        this.router.navigate(['/recipes', id]).then(() => {
          window.location.reload();
        });
      });
  }
  addRecipe(recipe: Recipe) {
    return this.http.post(
      'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipe
    );
  }
  getAllRecipe() {
    return this.http
      .get(
        'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((responseData) => {
          const newData: Recipe[] = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              newData.push({ ...responseData[key], id: key });
            }
          }
          return newData;
        })
      );
  }
  getRecipe(sendedId: string) {
    return this.http
      .get(
        'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((responseData) => {
          let recipeById = <Recipe>{};
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              if (sendedId === key) {
                recipeById = responseData[key];
                recipeById.id = key;
              }
            }
          }
          return recipeById;
        })
      );
  }
}
