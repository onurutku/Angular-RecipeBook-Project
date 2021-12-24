import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  allRecipes: Recipe[] = [];
  allRecipSubs: Subscription;
  constructor(private router: ActivatedRoute) {}
  ngOnInit() {
    this.allRecipSubs = this.router.data.subscribe((data: Data) => {
      this.allRecipes = data['recipe'];
    });
  }
  ngOnDestroy(): void {
    this.allRecipSubs.unsubscribe();
  }
}
