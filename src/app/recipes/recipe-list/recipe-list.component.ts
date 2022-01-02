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
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.recipSubs = this.recipesService.getAllRecipe().subscribe((data) => {
      this.recipes = data;
    });
    // this.recipSubs = this.recipesService.recipesChanged.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
    // this.recipSubs = this.route.data.subscribe((data: Data) => {
    //   console.log(data);
    //   this.recipes = data['recipes'];
    // });
    // this.recipesService.getAllRecipe().subscribe((data: Recipe[]) => {
    //   this.recipes = data;
    //   // console.log(this.recipes);
    // });
    // this.recipes = this.recipesService.getRecipes();
  }
  ngOnDestroy() {
    this.recipSubs.unsubscribe();
  }
}
