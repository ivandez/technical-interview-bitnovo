enum Currency {
  BHC = "Bitcoin Cash Test BCH",
  BTC = "Bitcoin Test BTC",
}

const getMinAndMaxByCurrency = (currency: any): any => {
  switch (currency) {
    case Currency.BHC:
      return { min: 0.05, max: 20000.0 };
    case Currency.BTC:
      return { min: 0.01, max: 10000.0 };
    default:
      return false;
  }
};

export default getMinAndMaxByCurrency;
