// import { Inter } from 'next/font/google'

import bitnovoApiClient from "@/util/network/bitnovoApiClient";
import { Currencies } from "@/util/network/domain/interfaces";

// const inter = Inter({ subsets: ['latin'] })

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  currency: string;
  concept: string;
  amount: string;
};

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <h1>crear pago</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>importe a pagar</label>
        <input type="number" {...register("amount")}></input>
        <br />

        <label>selecionar moneda</label>
        <select {...register("currency")}>
          {currencies.map((currency) => (
            <option key={currency.name} value={currency.name}>
              {currency.name}
            </option>
          ))}
        </select>
        <br></br>

        <label>concepto</label>
        <input type="text" {...register("concept")}></input>
        <br></br>

        <button type="submit">Continuar</button>
      </form>
    </>
  );
}
