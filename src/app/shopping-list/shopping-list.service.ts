import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  choosenIndex=new Subject<number>()
  // ingredientsChanged=new EventEmitter<Ingredient[]>();
  ingredientsChanged=new Subject<Ingredient[]>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }
  getIngredients(){
    return this.ingredients;
  }
  getIngredient(index:number){
    return this.ingredients[index];
  }
  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteAll(){
    this.ingredients=[];
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteOne(index:number){
    if(this.ingredients.length===1){
      this.ingredients=[];
    }else{
      this.ingredients.splice(index,1);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
