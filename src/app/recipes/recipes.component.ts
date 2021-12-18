import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  allRecipes: Recipe[] = [];
  constructor(private recipesServices: RecipesService) {}
  ngOnInit(): void {
    this.allRecipes = this.recipesServices.getRecipes();
  }
}
