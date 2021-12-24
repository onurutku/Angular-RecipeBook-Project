import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from '../recipes.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  message: string;
  id: number;
  recipe: Recipe;
  editMode: boolean = false;
  paramsSubcription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.paramsSubcription = this.route.data.subscribe((data: Data) => {
      this.message = data['message'];
    });
    this.paramsSubcription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode === true) {
        this.recipe = this.recipesService.getRecipe(this.id);
      }
    });
  }
  ngOnDestroy(): void {
    this.paramsSubcription.unsubscribe();
  }
}
