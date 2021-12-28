import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  @ViewChild('list') ul:ElementRef;

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
  onEditItem(index:number){
    this.shoppingList.choosenIndex.next(index);
    const elem=this.ul.nativeElement.children[index];
    if(!elem.classList.contains('choosen')){
      elem.classList.add('choosen');
    }else{
      elem.classList.remove('choosen');
    }
  }
}
