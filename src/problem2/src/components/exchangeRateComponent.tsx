import { Form, Select, Typography } from "antd";
import { isEmpty } from "lodash";
import { currencyConstraint } from "../constraint/formConstraint";
import { ExchangeRatesModel } from "../model/currencyFormModel";
import { convertCurrency } from "../helpers/exchangeRateHelper";

const { Option } = Select;

//Prefix selector for input field
export const prefixSelector = (
  name: string,
  exchangeRates: ExchangeRatesModel[]
) => (
  <Form.Item name={name} rules={currencyConstraint} noStyle>
    <Select className="w-[7.5rem]">
      {!isEmpty(exchangeRates) &&
        exchangeRates.map((item: ExchangeRatesModel, index: number) => (
          <Option key={index} value={JSON.stringify(item)}>
            <p className="text-sky-600">{item.currency}</p>
          </Option>
        ))}
    </Select>
  </Form.Item>
);

//Exchange rate for the amount of 1
export const ExchangeRateForOne = ({
  type,
  currentExchangeFrom,
  currentExchangeTo,
}: {
  type: "from" | "to";
  currentExchangeFrom: ExchangeRatesModel;
  currentExchangeTo: ExchangeRatesModel;
}) => {
  const checkType = type === "from";
  const currencyLabelFrom = currentExchangeFrom.currency;
  const currencyLabelTo = currentExchangeTo.currency;
  const currencyExchanged = convertCurrency(
    1,
    checkType ? currentExchangeFrom.price : currentExchangeTo.price,
    checkType ? currentExchangeTo.price : currentExchangeFrom.price
  ).toFixed(4);
  return (
    <>
      <Typography.Paragraph color="#A3A3A3">
        {`1 ${
          checkType ? currencyLabelFrom : currencyLabelTo
        } = ${currencyExchanged} ${
          checkType ? currencyLabelTo : currencyLabelFrom
        }`}
      </Typography.Paragraph>
    </>
  );
};
