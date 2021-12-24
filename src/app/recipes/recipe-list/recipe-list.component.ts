import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private router: ActivatedRoute) {}
  ngOnInit() {
    this.router.data.subscribe((data: Data) => {
      this.recipes = data['recipe'];
    });
  }
}
