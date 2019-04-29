import { assignmentPattern } from "@babel/types";
import { Ingredient } from "../models/ingredient";
import { getTotalPrice } from "../utils";

it("renders without crashing", () => {
  const ingredients = new Map<string, Ingredient>([
    ["cucumber", { name: "cucumber", price: 0.5 }],
    ["tomato", { name: "tomato", price: 0.6 }],
    ["egg", { name: "egg", price: 3 }],
    ["tuna", { name: "tuna", price: 2 }],
    ["potato", { name: "potato", price: 1.2 }],
    ["lettuce", { name: "lettuce", price: 0.2 }],
    ["corn", { name: "corn", price: 2 }],
    ["onion", { name: "onion", price: 0.3 }],
    ["mashroom", { name: "mashroom", price: 2.5 }],
    ["pasta", { name: "pasta", price: 4 }],
    ["pickles", { name: "pickles", price: 3.3 }]
  ]);

  const ingredientsOrder = new Map<string, number>([
    ["cucumber", 1],
    ["tomato", 2],
    ["egg", 3]
  ]);
  const expectedTotal = 10.7;
  const actualTotal = getTotalPrice(ingredients, ingredientsOrder);
  expect(actualTotal).toEqual(expectedTotal);
});
