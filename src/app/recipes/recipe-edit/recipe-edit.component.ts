import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  editForm: FormGroup;
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
      this.initForm();
    });
  }
  private initForm() {
    if (this.editMode === true) {
      this.recipe = this.recipesService.getRecipe(this.id);
    }
    const ingrediental = new FormArray([]);
    if (this.recipe.ingredients) {
      for (let ingredient of this.recipe.ingredients) {
        ingrediental.push(
          new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount),
          })
        );
      }
    }
    this.editForm = new FormGroup({
      name: new FormControl(this.recipe.name),
      title: new FormControl(this.recipe.desc),
      imagePath: new FormControl(this.recipe.imagePath),
      description: new FormControl(this.recipe.description),
      ingredients: ingrediental,
    });
  }
  getControls() {
    return (<FormArray>this.editForm.get('ingredients')).controls;
  }
  ngOnDestroy(): void {
    this.paramsSubcription.unsubscribe();
  }
  onSubmit() {}
  addIngredient() {}
}
