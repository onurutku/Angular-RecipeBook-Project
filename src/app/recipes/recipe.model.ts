export class Recipe {
  //   public name: string;
  //   public description: string;
  //   public imagePath: string;
  constructor(
    public name: string,
    public desc: string,
    public imagePath: string
  ) {
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
  }
}
