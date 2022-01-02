import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  subs: Subscription;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}
  ngOnInit() {
    this.subs = this.route.data.subscribe((data: Data) => {
      this.recipes = data['recipes'];
    });
  }
}
