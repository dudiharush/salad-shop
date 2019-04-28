import * as React from "react";
import { LandingPage } from "./landing-page";
import { IngredientsPage } from "./ingredients/ingredients-page";
import { CheckoutPage } from "./checkout/checkout-page";
import { SummaryModal } from "./summary-modal/summary-modal";
import { OrderSummary } from "./summary-modal/order-summary";
import { useState } from "react";
import { OrderStage } from "../models/types";

export const StageContainer = () => {
  const [currentStage, setStage] = useState(OrderStage.Landing);
  const [showModal, setShowModal] = useState(false);

  const stagesMap = {
    [OrderStage.Landing]: () => (
      <LandingPage goToNext={() => setStage(OrderStage.Ingrediants)} />
    ),
    [OrderStage.Ingrediants]: () => (
      <IngredientsPage
        goToPrev={() => setStage(OrderStage.Landing)}
        goToNext={() => setStage(OrderStage.Checkout)}
      />
    ),
    [OrderStage.Checkout]: () => (
      <CheckoutPage
        goToPrev={() => setStage(OrderStage.Ingrediants)}
        setShowModal={setShowModal}
      />
    )
  };

  const getStage = () => {
    return stagesMap[currentStage]();
  };

  return (
    <div>
      {showModal && (
        <SummaryModal show handleClose={() => setStage(OrderStage.Landing)}>
          <OrderSummary />
        </SummaryModal>
      )}
      {getStage()}
    </div>
  );
};
