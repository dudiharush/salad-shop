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
import * as validator from "validator";

export const CheckoutPage = ({
  goToPrev,
  setShowModal
}: IStageEvents & {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { dispatch, state } = useContext(OrderContext);

  const totalPrice = getTotalPrice(state.ingredients, state.ingredientsOrder);
  const [validations, setValidations] = React.useState({
    isEmailValid: true,
    isFormValidated: false
  });

  useEffect(() => {
    if (Object.values(validations).every(isValid => isValid)) {
      setShowModal(true);
    }
    return () => {
      setShowModal(false);
    };
  }, [setShowModal, ...Object.values(validations)]);

  const orderButtonClick = () => {
    setValidations({
      isEmailValid: validator.isEmail(state.email),
      isFormValidated: true
    });
  };

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
            defaultValue={state.name}
            onChange={name => dispatch(setName(name))}
          />
          <DetailsField
            fieldName="Email"
            defaultValue={state.email}
            onChange={email => dispatch(setEmail(email))}
            isValid={validations.isEmailValid}
          />
          <DetailsField
            fieldName="Additional Notes"
            defaultValue={state.notes}
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
