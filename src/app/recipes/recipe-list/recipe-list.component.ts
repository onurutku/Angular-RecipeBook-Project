import { Component, OnInit } from '@angular/core';
import { Recipe } from './../recipe.model';
// import { zurna } from './../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/bean-recipes-1.jpg'
    ),
  ];
  // kabak = zurna;
  constructor() {}

  ngOnInit(): void {}
}
