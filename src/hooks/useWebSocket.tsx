import { OrderPayment, Status } from "@/util/network/domain/interfaces";
import { useEffect, useState } from "react";

const useWebSocket = (identifier: string) => {
  const [paymentOk, setpaymentOk] = useState(false);
  const [paymentPeding, setPaymentPeding] = useState(true);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://payments.pre-bnvo.com/ws/${identifier}`
    );
    socket.onopen = () => {
      socket.onmessage = (event) => {
        const data: OrderPayment = JSON.parse(event.data);
        if (data.status === Status.AC || data.status === Status.CO) {
          setpaymentOk(true);
        } else if (data.status === Status.EX || data.status === Status.OC) {
          setpaymentOk(false);
        }
        setPaymentPeding(false);

        socket.close();
      };
    };
  }, [identifier]);

  return [paymentOk, paymentPeding];
};

export default useWebSocket;
