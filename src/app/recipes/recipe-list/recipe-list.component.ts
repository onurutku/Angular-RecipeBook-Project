import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
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
  @Output() sendRecipesAll = new EventEmitter();
  @Output() sendRecipeIdEmit = new EventEmitter();
  constructor() {}
  getIdFromList(val: any) {
    this.sendRecipeIdEmit.emit(val);
  }
  ngOnInit(): void {
    this.sendRecipesAll.emit(this.recipes);
  }
}
