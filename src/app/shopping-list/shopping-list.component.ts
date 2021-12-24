import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubscription:Subscription
  constructor(private shoppingList:ShoppingListService) {
  }
  ngOnInit() {
    this.ingredients=this.shoppingList.getIngredients();
    this.ingredientSubscription=this.shoppingList.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    })
  }
  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }
}
