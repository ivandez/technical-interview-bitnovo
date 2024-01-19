// import { Inter } from 'next/font/google'
import CreatePayment from "@/components/CreatePayment";
import bitnovoApiClient from "@/util/network/bitnovoApiClient";
import { Currency } from "@/util/network/domain/interfaces";
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
  currencies: Currency[];
};

export default function Home({ currencies }: Props) {
  return <CreatePayment currencies={currencies} />;
}
