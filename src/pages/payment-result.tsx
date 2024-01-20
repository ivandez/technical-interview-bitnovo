import PaymentInformation from "@/components/PaymentInformation";
import { RootState } from "@/redux/store";

import { useSelector } from "react-redux";

export default function PaymentResult() {
  const payment = useSelector((state: RootState) => state.payment);

  return <PaymentInformation paymentState={payment.orderState} />;
}
