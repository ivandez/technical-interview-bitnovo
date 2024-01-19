// import { Inter } from 'next/font/google'
import CreatePayment from "@/components/CreatePayment";
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
  return <CreatePayment currencies={currencies} />;
}
