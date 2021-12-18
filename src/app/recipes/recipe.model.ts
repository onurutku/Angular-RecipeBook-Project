import { Ingredient } from "../shared/ingredient.model";
export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public desc: string,
    public imagePath: string,
    public description: string,
    public ingredients: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
    this.description = description;
    this.ingredients = ingredients;
  }
}
