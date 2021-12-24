import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  paramsSubscription: Subscription;
  constructor(private router: ActivatedRoute) {}
  ngOnInit() {
    this.paramsSubscription = this.router.data.subscribe((data: Data) => {
      this.recipes = data['recipe'];
    });
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
