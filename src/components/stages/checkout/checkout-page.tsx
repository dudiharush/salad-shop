import * as React from "react";
import { IngredientsPicker } from "../ingredients/ingredient-picker";
import "./checkout-page.css";
import { useEffect, useContext } from "react";
import { DetailsField } from "./details-field";
import { getTotalPrice } from "../../../utils";
import { OrderContext } from "../../../models/order-context";
import {
  setName,
  setEmail,
  setAdditionalNotes
} from "../../../action-creators";
import { IStageEvents } from "../../../models/types";

export const CheckoutPage = ({
  goToPrev,
  setShowModal
}: IStageEvents & {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { dispatch, state } = useContext(OrderContext);

  const totalPrice = getTotalPrice(state.ingredients, state.ingredientsOrder);

  useEffect(
    () => () => {
      setShowModal(false);
    },
    [setShowModal]
  );

  const orderButtonClick = () => setShowModal(true);

  const goBackButtonClick = () => goToPrev && goToPrev();

  return (
    <>
      <div className="page-header">{"Your Salad:"}</div>
      <div className="checkout-wrapper">
        <div>
          {Array.from(state.ingredientsOrder.keys()).map(ingredientName => (
            <IngredientsPicker
              key={ingredientName}
              ingredient={state.ingredients.get(ingredientName)}
              isReadOnly
            />
          ))}

          <div className="total-price">{`Total Price is: $${totalPrice}`}</div>
        </div>
        <div className="order-details-wrapper">
          <DetailsField
            fieldName="Name"
            onChange={name => dispatch(setName(name))}
          />
          <DetailsField
            fieldName="Email"
            onChange={email => dispatch(setEmail(email))}
          />
          <DetailsField
            fieldName="Additional Notes"
            onChange={notes => dispatch(setAdditionalNotes(notes))}
          />
          <div className="buttons-wrapper">
            <span className="button" onClick={goBackButtonClick}>
              {"Go Back"}
            </span>
            <span className={"button"} onClick={orderButtonClick}>
              {"Order"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
