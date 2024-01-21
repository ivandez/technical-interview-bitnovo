import CreatePayment from "@/components/CreatePayment";
import bitnovoApiClient from "@/util/network/bitnovoApiClient";
import { Currency } from "@/util/network/domain/interfaces";

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

export default function Home({ currencies }: Props) {
  return <CreatePayment currencies={currencies} />;
}
