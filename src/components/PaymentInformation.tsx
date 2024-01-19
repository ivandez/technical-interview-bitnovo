import Image from "next/image";
import Link from "next/link";
import successImg from "../../public/tick-circlesuccess.png";
import cancelImg from "../../public/close-circle.png";

type Props = {
  paymentState: true | false;
};

enum PaymentResult {
  success = "¡Pago completado!",
  cancel = "¡Pago canelado!",
}

const PaymentInformation = ({ paymentState }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center container mx-auto px-4 gap-4">
      <Image
        src={paymentState ? successImg : cancelImg}
        alt="payment information"
      />
      <p className="font-bold text-xl text-[#002859]">
        {" "}
        {paymentState ? PaymentResult.success : PaymentResult.cancel}
      </p>
      <p className="text-justify text-[#647184]">
        Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et varius
        dolor elit facilisi enim. Nulla ut ut eu nunc.
      </p>
      <Link
        href="/"
        className="rounded border-solid bg-blue-800 w-full text-white px-6 py-[18px] text-center font-semibold mt-6"
      >
        Crear nuevo pago
      </Link>
    </div>
  );
};

export default PaymentInformation;
