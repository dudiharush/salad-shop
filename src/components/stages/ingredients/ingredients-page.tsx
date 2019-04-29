import * as React from "react";
import { IngredientsPicker } from "./ingredient-picker";
import { OrderContext } from "../../../models/order-context";
import { useContext, useEffect } from "react";
import { setIngredietns, orderItem } from "../../../action-creators";
import { loadIngredients } from "../../../data-loaders";
import { IStageEvents } from "../../../models/types";

export const IngredientsPage = (props: IStageEvents) => {
  const { dispatch, state } = useContext(OrderContext);

  const ingredientsArr = Array.from(state.ingredients.values());

  useEffect(() => {
    if (state.ingredients.size === 0) {
      loadIngredients().then(ingretients => {
        dispatch(setIngredietns(ingretients));
      });
    }
  }, [state.ingredients, dispatch]);

  const addItem = (ingredientName: string) => (amount: string) =>
    dispatch(orderItem(ingredientName, +amount));

  const proceedToCheckoutClick = () => props.goToNext && props.goToNext();
  if (state.ingredients.size === 0) return <span>Loading...</span>;

  return (
    <>
      <div className="page-header">{"Select Ingredients"}</div>
      <div className="page-content">
        {ingredientsArr &&
          ingredientsArr.map(ingredient => (
            <IngredientsPicker
              key={ingredient.name}
              ingredient={ingredient}
              onChange={addItem(ingredient.name)}
            />
          ))}
        <div className="button" onClick={proceedToCheckoutClick}>
          {"Proceed To Checkout"}
        </div>
      </div>
    </>
  );
};
