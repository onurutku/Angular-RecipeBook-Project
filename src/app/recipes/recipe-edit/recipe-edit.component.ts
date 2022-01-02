import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editForm: FormGroup;
  message: string;
  id: string;
  recipe = <Recipe>{};
  editMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.editMode = this.route.snapshot.queryParams.editMode;
    this.route.data.subscribe((data: Data) => {
      this.message = data['message'];
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  private initForm() {
    const ingrediental = new FormArray([]);
    if (this.editMode === true) {
      // this.recipesService.getRecipe(this.id).subscribe((data) => {
      //   this.recipe = data;
      // });
      this.route.data.subscribe((data: Data) => {
        this.recipe = data['recipe'];
      });
      // this.recipe = this.recipesService.getRecipe(this.id);
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
    }
    this.editForm = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      title: new FormControl(this.recipe.desc, Validators.required),
      imagePath: new FormControl(this.recipe.imagePath, Validators.required),
      description: new FormControl(this.recipe.description),
      ingredients: ingrediental,
    });
  }
  getControls() {
    return (<FormArray>this.editForm.get('ingredients')).controls;
  }
  addControl() {
    const newGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
    });
    (this.editForm.get('ingredients') as FormArray).push(newGroup);
  }
  deleteControl(index: number) {
    (this.editForm.get('ingredients') as FormArray).removeAt(index);
  }
  onSubmit() {
    const editedRecipe = new Recipe(
      this.id,
      this.editForm.get('name').value,
      this.editForm.get('title').value,
      this.editForm.get('imagePath').value,
      this.editForm.get('description').value,
      this.editForm.get('ingredients').value
    );
    if (this.editMode) {
      this.recipesService.updateRecipes(this.id, editedRecipe);
      this.editMode = false;
    } else {
      this.recipesService.addRecipe(editedRecipe).subscribe((responseData) => {
        this.router.navigate(['/recipes']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
