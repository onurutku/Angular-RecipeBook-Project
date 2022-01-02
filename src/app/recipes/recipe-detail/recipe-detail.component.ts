import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipesService } from '../recipes.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  clickedId: string;
  recipe: Recipe;
  paramsSubscription: Subscription;
  dataSubs: Subscription;

  constructor(
    private recipesServices: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  toShoppingList(ingredients: Ingredient[]) {
    this.recipesServices.addIngredientsToShoppingList(ingredients);
  }
  ngOnInit() {
    this.dataSubs = this.route.data.subscribe((data: Data) => {
      this.recipe = data['recipe'];
    });
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.clickedId = params['id'];
    });
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
  onDelete() {
    this.recipesServices.deleteRecipe(this.clickedId);
    this.router.navigate(['/recipes']);
  }
}
