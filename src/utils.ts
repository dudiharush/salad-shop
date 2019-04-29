import { Ingredient } from "./models/ingredient";

export const getTotalPrice = (
  ingredients: Map<string, Ingredient>,
  ingredientsOrder: Map<string, number>
): number => {
  const totalPrice = Array.from(ingredientsOrder).reduce(
    (accPrice, [ingredientName, ingredientAmount]) => {
      const ingredient = ingredients.get(ingredientName);
      accPrice += ingredient.price * ingredientAmount;
      return accPrice;
    },
    0
  );

  return totalPrice;
};
