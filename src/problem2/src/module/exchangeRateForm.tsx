import { Button, Divider, Form, FormInstance, InputNumber, Spin } from "antd";
import {
  CurrencyFormModel,
  ExchangeRatesModel,
} from "../model/currencyFormModel";
import { valueConstraint } from "../constraint/formConstraint";
import {
  ExchangeRateForOne,
  prefixSelector,
} from "../components/exchangeRateComponent";
import { convertCurrency } from "../helpers/exchangeRateHelper";
import { useState } from "react";
import { SwapOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";

export const ExchangeRateForm = ({
  form,
  exchangeRates,
}: {
  form: FormInstance<any>;
  exchangeRates: ExchangeRatesModel[];
}) => {
  const [loading, setLoading] = useState(false);
  const [currentExchangeFrom, setCurrentExchangeFrom] =
    useState<ExchangeRatesModel>();
  const [currentExchangeTo, setCurrentExchangeTo] =
    useState<ExchangeRatesModel>();
  const checkCurrentExchange =
    !isEmpty(currentExchangeFrom) && !isEmpty(currentExchangeTo);

  //Function to run when submit form
  const onFinish = async (values: CurrencyFormModel) => {
    setLoading(true);
    const exchangeInput: ExchangeRatesModel = JSON.parse(
      values.exchangeRateInput
    );
    const exchangeOutput: ExchangeRatesModel = JSON.parse(
      values.exchangeRateOutput
    );
    setTimeout(() => {
      console.log(values);
      form.setFieldValue(
        "outputAmount",
        convertCurrency(
          values.inputAmount,
          exchangeInput.price,
          exchangeOutput.price
        ).toFixed(4)
      );
      setCurrentExchangeFrom(exchangeInput);
      setCurrentExchangeTo(exchangeOutput);
      setLoading(false);
    }, 800);
  };

  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<CurrencyFormModel>
          name="inputAmount"
          label="Amount to send"
          rules={valueConstraint}
        >
          <InputNumber
            className="w-full pt-2"
            min={0}
            addonBefore={prefixSelector("exchangeRateInput", exchangeRates)}
            placeholder="Input amount"
            size="middle"
          />
        </Form.Item>
        {checkCurrentExchange && (
          <ExchangeRateForOne
            type="from"
            currentExchangeFrom={currentExchangeFrom}
            currentExchangeTo={currentExchangeTo}
          />
        )}
        <Divider>
          <Form.Item>
            <Button
              type="text"
              className="mt-6 bg-gradient-to-r from-blue-500 to-sky-500 text-white"
              icon={<SwapOutlined />}
              htmlType="submit"
            >
              Confirm Swap
            </Button>
          </Form.Item>
        </Divider>
        <Form.Item<CurrencyFormModel>
          name="outputAmount"
          label="Amount to receive"
        >
          <InputNumber
            className="w-full pt-2"
            min={0}
            addonBefore={prefixSelector("exchangeRateOutput", exchangeRates)}
            placeholder="Output amount"
            size="middle"
            readOnly
          />
        </Form.Item>
        {checkCurrentExchange && (
          <ExchangeRateForOne
            type="to"
            currentExchangeFrom={currentExchangeFrom}
            currentExchangeTo={currentExchangeTo}
          />
        )}
      </Form>
    </Spin>
  );
};
