import * as React from "react";
import { useContext } from "react";
import { OrderContext } from "../../../models/order-context";
import { getTotalPrice } from "../../../utils";
import { OrderDetailsField } from "./order-details-field";

export const OrderSummary = () => {
  const { state } = useContext(OrderContext);
  return (
    <div>
      Thank You Very Much For Ordering From Salad Shop. Food Is On its Way...
      <OrderDetailsField
        fieldName="Total Price"
        data={getTotalPrice(
          state.ingredients,
          state.ingredientsOrder
        ).toString()}
      />
      <OrderDetailsField fieldName="Name" data={state.name} />
      <OrderDetailsField fieldName="Email" data={state.email} />
      <OrderDetailsField fieldName="Additional Notes" data={state.notes} />
    </div>
  );
};
