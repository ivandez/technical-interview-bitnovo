// import { Inter } from 'next/font/google'

import bitnovoApiClient from "@/util/network/bitnovoApiClient";
import { Currencies } from "@/util/network/domain/interfaces";

// const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const currencies = await bitnovoApiClient.getCurrencies();
  return {
    props: {
      currencies,
    },
  };
}

type Props = {
  currencies: Currencies[];
};

export default function Home({ currencies }: Props) {
  return (
    <>
      <h1>crear pago</h1>
      <form>
        <label>importe a pagar</label>
        <input type="number"></input>
        <br />

        <label>selecionar moneda</label>
        <select>
          {currencies.map((currency) => (
            <option key={currency.name} value={currency.name}>
              {currency.name}
            </option>
          ))}
        </select>
        <br></br>

        <label>concepto</label>
        <input type="text"></input>
        <br></br>

        <button type="submit">Continuar</button>
      </form>
    </>
  );
}
