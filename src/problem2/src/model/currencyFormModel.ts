export interface CurrencyFormModel {
  inputAmount: number;
  outputAmount: number;
  exchangeRateInput: string;
  exchangeRateOutput: string;
}

export interface ExchangeRatesModel {
  currency: string;
  date: string;
  price: number;
}
