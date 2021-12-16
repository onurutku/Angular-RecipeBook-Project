import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  newIngredient: any = {};
  @Output() ingredientsEmit = new EventEmitter<Ingredient>();
  constructor() {}
  addIngredients(name: string, amount: number) {
    this.newIngredient.name = name;
    this.newIngredient.amount = amount;
    this.ingredientsEmit.emit(this.newIngredient);
  }
  ngOnInit(): void {}
}
