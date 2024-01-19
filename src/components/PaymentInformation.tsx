import Image from "next/image";
import Link from "next/link";

type Props = {
  paymentState: true | false;
};

const PaymentInformation = ({ paymentState }: Props) => {
  return (
    <div>
      <Image
        src={paymentState ? "/tick-circlesuccess.png" : "/close-circle.png"}
        alt="payment information"
        width={500}
        height={500}
      />
      <p>¡Pago completado!</p>
      <p>
        Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et varius
        dolor elit facilisi enim. Nulla ut ut eu nunc.
      </p>
      <Link href="/">Crear nuevo pago</Link>
    </div>
  );
};

export default PaymentInformation;
