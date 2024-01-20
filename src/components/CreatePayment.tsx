import { setPayment } from "@/redux/features/paymentSlice";
import getMinAndMaxByCurrency from "@/util/getMinAndMaxByCurrency";
import bitnovoApiClient from "@/util/network/bitnovoApiClient";
import { Currency } from "@/util/network/domain/interfaces";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

type Inputs = {
  input_currency: string;
  notes: string;
  expected_output_amount: string;
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
  currencies: Currency[];
};

export default function CreatePayment({ currencies }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { identifier } = await bitnovoApiClient.makeOrder(data);
    const { fiat_amount, currency_id, created_at, notes, address } =
      await bitnovoApiClient.getOrder(identifier);
    const payload = {
      identifier,
      fiat_amount, //importe
      currency_id, //moneda seleccionada
      created_at, //fecha de creación
      notes, //concepto
      address,
    };
    dispatch(setPayment(payload));
    router.push("/order-summary");
  };

  const dispatch = useDispatch();

  const currentCurrency = getMinAndMaxByCurrency(watch("input_currency"));

  return (
    <div className="flex flex-col w-full container mx-auto px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 lg:w-[609px] lg:mx-auto"
      >
        <h1 className="text-2xl text-center text-[#002859] font-bold">
          Crear pago
        </h1>
        <div className="flex flex-col gap-1">
          <label className="text-[#002859] font-bold">Importe a pagar</label>
          <input
            type="number"
            {...register("expected_output_amount", {
              required: true,
              min: currentCurrency.min,
              max: currentCurrency.max,
            })}
            placeholder="Añade importe a pagar"
            className="rounded border-[#647184] border-solid border-[1px] px-3 py-[18px]"
          ></input>
          {errors.expected_output_amount?.type === "required" && (
            <p role="alert" className="text-red-500">
              Importe es requerido
            </p>
          )}
          {errors.expected_output_amount?.type === "min" && (
            <p role="alert" className="text-red-500">
              El importe mínimo es {currentCurrency.min}
            </p>
          )}
          {errors.expected_output_amount?.type === "max" && (
            <p role="alert" className="text-red-500">
              El importe maxímo es {currentCurrency.max}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#002859] font-bold">Selecionar moneda</label>
          <select
            {...register("input_currency", { required: true })}
            className="rounded border-[#647184] border-solid border-[1px] px-3 py-[18px] bg-white"
          >
            {currencies.map((currency) => (
              <option key={currency.name} value={currency.symbol}>
                {currency.name}
              </option>
            ))}
          </select>
          {errors.input_currency?.type === "required" && (
            <p role="alert" className="text-red-500">
              Moneda es requerido
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-bold text-[#002859]">Concepto</label>
          <input
            type="text"
            {...register("notes", { required: true })}
            className="rounded border-[#647184] border-solid border-[1px] px-3 py-[18px]"
            placeholder="Añade un descripción del pago"
          ></input>
          {errors.notes?.type === "required" && (
            <p role="alert" className="text-red-500">
              Concepto es requerido
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`rounded border-solid w-full text-white px-18 py-6 ${
            isValid ? "bg-blue-800" : "bg-[#C6DFFE]"
          }`}
        >
          Continuar
        </button>
      </form>
    </div>
  );
}
