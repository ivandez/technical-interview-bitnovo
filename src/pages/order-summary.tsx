import QRCode from "qrcode.react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { OrderPayment, Status } from "@/util/network/domain/interfaces";

const date = new Date("2024-01-19T17:27:58.094653+01:00");

const humanReadableDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

// console.log(humanReadableDate);

export default function OrderSummary() {
  const payment = useSelector((state: RootState) => state.payment);
  console.log("🚀 ~ OrderSummary ~ payment:", payment);

  const socket = new WebSocket(
    `wss://payments.pre-bnvo.com/ws/${payment.identifier}`
  );

  socket.onopen = () => {
    console.log("connected");
  };

  useEffect(() => {
    const socket = new WebSocket(
      `wss://payments.pre-bnvo.com/ws/${payment.identifier}`
    );

    socket.onopen = () => {
      console.log("connected");
    };

    socket.onmessage = (event) => {
      const data: OrderPayment = JSON.parse(event.data);
      if (data.status === Status.AC || data.status === Status.CO) {
        console.log("paid");
      } else if (data.status === Status.EX || data.status === Status.OC) {
        console.log("cancel");
      }
      socket.close();
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [payment.identifier]);

  return (
    <div>
      <h1>resumen pedido</h1>

      <p>importe</p>
      <p>{payment.fiat_amount}</p>
      <br />

      <p>moneda seleccionada</p>
      <p>{payment.currency_id}</p>
      <br />

      <p>fecha</p>
      <p>{payment.created_at.toString()}</p>
      <br />

      <p>Concepto</p>
      <p>{payment.notes}</p>
      <br />

      <QRCode value={payment.address} />
    </div>
  );
}
