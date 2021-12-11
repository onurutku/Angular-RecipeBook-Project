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

// async function atlar() {
//   const fec = await fetch(
//     'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
//   );
//   const data = await fec.json();
//   return data;
// }
// export const zurna = atlar();
// console.log(zurna);
// class Data {
//   public fec: any;
//   public data: string[];
//   async getData(): Promise<any> {
//     try {
//       this.fec = await fetch(
//         'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
//       );
//       this.data = await this.fec.json();
//       return this.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
// export const zurna = new Data();
// console.log(zurna.getData());
