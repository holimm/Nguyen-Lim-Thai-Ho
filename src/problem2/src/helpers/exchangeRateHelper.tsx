/*
@param 
  amount: amount to swap
  rateFrom: rate of the currency to swap from
  rateTo: rate of the current to swap to
@return amount after convert to other currency
*/
export const convertCurrency = (
  amount: number,
  rateFrom: number,
  rateTo: number
) => {
  if (rateFrom && rateTo) {
    const convertedAmount = (amount / rateFrom) * rateTo;
    return convertedAmount;
  } else {
    return 0;
  }
};
