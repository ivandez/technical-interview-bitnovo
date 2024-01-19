// import { Inter } from 'next/font/google'

import getMinAndMaxByCurrency from "@/util/getMinAndMaxByCurrency";
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

  const currentCurrency = getMinAndMaxByCurrency(watch("currency"));

  return (
    <div className="flex flex-col w-full container mx-auto px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <h1 className="text-2xl text-center">Crear pago</h1>
        <div className="flex flex-col gap-1">
          <label className="font-bold">Importe a pagar</label>
          <input
            type="number"
            {...register("amount", {
              required: true,
              min: currentCurrency.min,
              max: currentCurrency.max,
            })}
            placeholder="Añade importe a pagar"
            className="rounded border-[#647184] border-solid border-[1px] px-3 py-[18px]"
          ></input>
          {errors.amount?.type === "required" && (
            <p role="alert" className="text-red-500">
              Importe es requerido
            </p>
          )}
          {errors.amount?.type === "min" && (
            <p role="alert" className="text-red-500">
              El importe mínimo es {currentCurrency.min}
            </p>
          )}
          {errors.amount?.type === "max" && (
            <p role="alert" className="text-red-500">
              El importe maxímo es {currentCurrency.max}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-bold">Selecionar moneda</label>
          <select
            {...register("currency", { required: true })}
            className="rounded border-[#647184] border-solid border-[1px] px-3 py-[18px] bg-white"
          >
            {currencies.map((currency) => (
              <option key={currency.name} value={currency.name}>
                {currency.name}
              </option>
            ))}
          </select>
          {errors.currency?.type === "required" && (
            <p role="alert" className="text-red-500">
              Moneda es requerido
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-bold">Concepto</label>
          <input
            type="text"
            {...register("concept", { required: true })}
            className="rounded border-[#647184] border-solid border-[1px] px-3 py-[18px]"
            placeholder="Añade un descripción del pago"
          ></input>
          {errors.concept?.type === "required" && (
            <p role="alert" className="text-red-500">
              Concepto es requerido
            </p>
          )}
        </div>

        <button
          type="submit"
          className="rounded border-solid bg-blue-800 w-full text-white px-18 py-"
        >
          Continuar
        </button>
      </form>
    </div>
  );
}
