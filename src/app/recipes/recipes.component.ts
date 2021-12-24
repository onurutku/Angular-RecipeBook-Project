import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  allRecipes: Recipe[] = [];
  constructor(private router: ActivatedRoute) {}
  ngOnInit() {
    this.router.data.subscribe((data: Data) => {
      this.allRecipes = data['recipe'];
    });
  }
}
