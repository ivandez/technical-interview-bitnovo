import { OrderState, setOrderState } from "@/redux/features/paymentSlice";
import { RootState } from "@/redux/store";
import { OrderPayment, Status } from "@/util/network/domain/interfaces";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import verify from "../../public/verify.png";
import timerPng from "../../public/timer.png";
import Image from "next/image";
import humanReadableDate from "@/util/humanReadableDate";
import QRCode from "qrcode.react";

function Order() {
  const payment = useSelector((state: RootState) => state.payment);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    const socket = new WebSocket(
      `wss://payments.pre-bnvo.com/ws/${payment.identifier}`
    );

    socket.onmessage = (event) => {
      const data: OrderPayment = JSON.parse(event.data);
      if (data.status === Status.AC || data.status === Status.CO) {
        const payload = {
          orderState: OrderState.COMPLETED,
        };

        dispatch(setOrderState(payload));
      } else if (data.status === Status.EX || data.status === Status.OC) {
        const payload = {
          orderState: OrderState.FAILED,
        };

        dispatch(setOrderState(payload));
      }

      socket.close();

      router.push("/payment-result");
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [payment.identifier]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
      <div className="flex flex-col gap-8">
        <p className="text-[#002859] font-bold text-xl">Resumen del pedido</p>

        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <p className="text-[#002859] font-bold">Importe:</p>
            <p className="text-[#002859] font-bold">
              {payment.fiat_amount} EUR
            </p>
          </div>
          <hr />

          <div className="flex justify-between">
            <p className="text-[#002859] font-bold">Moneda seleccionada:</p>
            <p className="text-[#002859] font-bold">{payment.currency_id}</p>
          </div>
          <hr />

          <div className="flex justify-between">
            <p className="text-[#002859] font-bold">Comercio:</p>
            <div className="flex gap-1">
              <Image src={verify} alt="verify" />
              <p className="text-[#002859]">Comercio de pruebas de Semega</p>
            </div>
          </div>

          <div className="flex justify-between">
            <p className="text-[#002859] font-bold">Fecha:</p>
            <p>{humanReadableDate(payment.created_at)}</p>
          </div>
          <hr />

          <div className="flex justify-between">
            <p className="text-[#002859] font-bold">Concepto:</p>
            <p className="text-[#002859]">{payment.notes}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <p className="text-[#002859] font-bold text-xl">Realiza el pago</p>

        <div className="flex gap-1">
          <Image src={timerPng} alt="timer" />
          <span className="text-[#002859]">05:08</span>
        </div>

        <div className="flex gap-4 items-center">
          <span className="rounded-full bg-[#035AC5] text-white px-[12px] py-[6px]">
            Smart QR
          </span>
          <span>Web3</span>
        </div>
        <QRCode value={payment.address} />
        <div>
          <p className="text-[#002859]">
            Enviar <span className="font-bold">108,02 XRP</span>
          </p>
        </div>
        <p className="text-[#002859]">{payment.address}</p>
        <p className="text-[#002859]">Etiqueta de destino: 2557164061</p>
      </div>
    </div>
  );
}

export default Order;