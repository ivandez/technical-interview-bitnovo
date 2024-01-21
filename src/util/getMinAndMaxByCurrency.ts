import { ValidCurrency } from "./network/domain/interfaces";

const getMinAndMaxByCurrency = (
  currency: ValidCurrency
): { min: number; max: number } => {
  switch (currency) {
    case ValidCurrency.BCH_TEST:
      return { min: 0.05, max: 20000.0 };
    case ValidCurrency.BTC:
      return { min: 0.01, max: 10000.0 };
    case ValidCurrency.ETH_TEST3:
      return { min: 0.05, max: 20000.0 };
    case ValidCurrency.XRP_TEST:
      return { min: 0.01, max: 20000.0 };
    case ValidCurrency.USDC_TEST3:
      return { min: 0.05, max: 100.0 };
    default:
      return { min: 0, max: 0 };
  }
};

export default getMinAndMaxByCurrency;
