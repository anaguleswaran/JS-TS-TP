import TropPauvreErreur from "./execeptions/TropPauvreErreur.js";
class User {
  id: number;
  name: String;
  wallet: number;
  orders: Meal[];

  constructor(id: number, name: String, wallet: number, orders: Meal[]) {
    this.id = id;
    this.name = name;
    this.wallet = wallet;
    this.orders = orders;
  }

  orderMeal(meal: Meal[]) {
    // return new Promise
    let price = 0;
    meal.forEach((element) => {
      price += element.price;
    });
    if (price > this.wallet) {
      throw new TropPauvreErreur(
        `argent restant ${this.wallet} et total de la commande: ${price}`,
      );
    } else {
      meal.forEach((element) => {
        this.wallet -= element.price;
      });
    }
  }
}

export default User;
