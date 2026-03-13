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

  orderMeal(meal: Meal) {
    // let price = 0;
    // meal.forEach((element) => {
    //   price += element.price;
    // });
    if (meal.price > this.wallet) {
      throw new TropPauvreErreur(
        `argent restant ${this.wallet} et total de la commande: ${meal.price}`,
      );
    }
    //   meal.forEach((element) => {
    this.wallet -= meal.price;
    this.orders.push(meal);
    //   });
    localStorage.setItem("user", JSON.stringify(this));
  }
}

export default User;
