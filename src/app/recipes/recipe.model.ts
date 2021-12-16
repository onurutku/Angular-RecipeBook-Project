export class Recipe {
  //   public name: string;
  //   public description: string;
  //   public imagePath: string;
  constructor(
    public id: number,
    public name: string,
    public desc: string,
    public imagePath: string,
    public description: string,
    public ingredients: string
  ) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
    this.description = description;
    this.ingredients = ingredients;
  }
}
