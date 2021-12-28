import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  shoppingListForm:FormGroup;
  editMode=false;
  editedItem:Ingredient;
  choosenIndexFromService:number;
  choosenIndexSubs:Subscription;
  constructor(private shoppingList:ShoppingListService) {}

  ngOnInit(): void {
      this.shoppingListForm=new FormGroup({
        ingredientName:new FormControl(null,Validators.required),
        ingredientAmount:new FormControl(null,[Validators.required,Validators.min(0)]),
      })
      this.choosenIndexSubs=this.shoppingList.choosenIndex.subscribe((data)=>{
        this.choosenIndexFromService=data;
        this.editMode=true;
        this.editedItem=this.shoppingList.getIngredient(data);
        this.shoppingListForm.setValue({
          ingredientName:this.editedItem.name,
          ingredientAmount:this.editedItem.amount
        })
      })
  }
  onSubmit(){
    const newIngredient = new Ingredient( this.shoppingListForm.value.ingredientName, this.shoppingListForm.value.ingredientAmount);
    if(this.shoppingListForm.get('ingredientName').value == this.editedItem.name){
      this.shoppingList.updateIngredient(this.choosenIndexFromService,newIngredient)
      this.editMode=false;
    }else{
      this.shoppingList.addIngredient(newIngredient);
    }
    this.shoppingListForm.reset();
  }
  onClear(){
    this.shoppingListForm.reset();
    this.editMode=false;
    this.shoppingList.deleteAll();
  }
  onDelete(){
    if(this.editMode===true){
      this.shoppingList.deleteOne(this.choosenIndexFromService);
    }
    this.shoppingListForm.reset();
  }
  ngOnDestroy(): void {
      this.choosenIndexSubs.unsubscribe();
  }
}
