import { Ingredient } from "./models/ingredient";

export const getTotalPrice = (ingredients: Map<string, Ingredient>, ingredientsOrder: Map<string, number>): number => {
    let totalPrice = 0;
    ingredientsOrder.forEach((ingredientAmount, ingredientName) => {
      const ingredient = ingredients.get(ingredientName);
      totalPrice += ingredient.price * ingredientAmount;
    });

    return totalPrice;
  }