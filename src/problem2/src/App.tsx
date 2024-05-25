import { Divider, Flex, Form, Typography } from "antd";
import { ExchangeRatesModel } from "./model/currencyFormModel";
import { useEffect, useState } from "react";
import { ExchangeRateForm } from "./module/exchangeRateForm";

function App() {
  const [form] = Form.useForm();
  const [exchangeRates, setExchangeRates] = useState<ExchangeRatesModel[]>();

  //Fetch data from API
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );
      const data = await response.json();
      setExchangeRates(data);
    })();
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-sky-400 to-blue-500">
      <Flex
        className="h-screen w-11/12 md:w-10/12 lg:w-7/12 xl:w-[40%] mx-auto"
        justify="center"
        align="center"
        vertical
      >
        <div className="w-full bg-white px-8 py-12 shadow-lg rounded-xl">
          <Typography.Title level={3}>Swap</Typography.Title>
          <Divider />
          <ExchangeRateForm form={form} exchangeRates={exchangeRates} />
        </div>
      </Flex>
    </div>
  );
}

export default App;
