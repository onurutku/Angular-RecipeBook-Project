import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor() {}
  allRecipes: any = [];
  clickedId: number;
  recieveIdFromList(val: number) {
    this.clickedId = val;
  }
  recieveAllRecipes(val: any) {
    this.allRecipes = val;
  }
  ngOnInit(): void {}
}
