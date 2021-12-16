import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: any;
  @Output() recipeIdEmit = new EventEmitter();
  constructor() {}

  sendId(idVal: number) {
    this.recipeIdEmit.emit(idVal);
  }
  ngOnInit(): void {}
}
