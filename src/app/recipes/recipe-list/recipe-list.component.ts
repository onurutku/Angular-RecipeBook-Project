import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from '../recipes.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Input() recipes: Recipe[];
  recipes: Recipe[] = [];
  recipSubs: Subscription;
  listener: Subscription;
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.recipSubs = this.route.data.subscribe((data: Data) => {
      this.recipes = data['recipes'];
    });
    this.listener = this.recipesService.recipesChanged.subscribe(() => {
      this.recipesChanged();
    });
  }
  ngOnDestroy() {
    this.recipSubs.unsubscribe();
    this.listener.unsubscribe();
  }
  recipesChanged() {
    this.recipesService.getAllRecipe().subscribe((allRecipes) => {
      this.recipes = allRecipes;
    });
  }
}
