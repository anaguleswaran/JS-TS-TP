import User from "./user.js";
async function recupererRepas(): Promise<Meal[] | null> {
  try {
    const response = await fetch(
      "https://keligmartin.github.io/api/meals.json",
    );

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des repas");
    }
    const repas: Meal[] = await response.json();
    return repas;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erreur: ", err.message);
    } else console.error("Une erreur est survenur lors du chargement de l'api");
    return null;
  }
}
const storage = JSON.parse(localStorage.getItem("user") || "{}");
const user = new User(
  storage.id || 1,
  storage.name || "Bob",
  storage.wallet || 3000,
  storage.orders || [],
);
const listRepas = document.getElementById("mealList");
const menuListe = document.getElementById("menuList");
const portefeuille = document.getElementById("portefeuille");
portefeuille!.textContent = `${user.wallet}`;
user.orders = storage.orders || [];

const historique = document.getElementById("historique");
(storage.orders || []).forEach((element: Meal) => {
  let li = document.createElement("li");
  li.textContent = `${element.name} - ${element.price}`;
  historique?.appendChild(li);
});

let prix = 0;

async function afficherRepas() {
  const meals = await recupererRepas();
  if (!meals) return;

  meals.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element.name} - ${element.price}`;
    listRepas?.appendChild(li);
    const button = document.createElement("button");
    button.textContent = "Commander";

    button.addEventListener("click", () => {
      const limenu = document.createElement("li");
      limenu.textContent = `${element.name} - ${element.price}`;
      menuListe?.appendChild(limenu);
      prix += element.price;
      user.orderMeal(element);
      portefeuille!.textContent = `${user.wallet}`;
      //   user.orders.push(element);
      //   localStorage.setItem("user", JSON.stringify(user));
    });
    listRepas?.appendChild(button);
  });
}
afficherRepas();
