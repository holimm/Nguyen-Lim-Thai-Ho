import { Rule } from "antd/es/form";

export const valueConstraint: Rule[] = [
  {
    required: true,
    message: "*Please enter amount you want to swap",
  },
];

export const currencyConstraint: Rule[] = [
  {
    required: true,
    message: "*Please choose the currency you want to swap",
  },
];
