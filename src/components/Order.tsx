import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import verify from "../../public/verify.png";
import timerPng from "../../public/timer.png";
import Image from "next/image";
import humanReadableDate from "@/util/humanReadableDate";
import RenderPaymentMethod from "./RenderPaymentMethod";
import { setOrderState } from "@/redux/features/paymentSlice";
import { OrderState } from "@/redux/features/domain/interfaces";
import useWebSocket from "@/hooks/useWebSocket";
import useTimer from "@/hooks/useTimer";
import cryptoDictionary from "@/util/cryptoDictionary";

function Order() {
  const payment = useSelector((state: RootState) => state.payment);

  const dispatch = useDispatch();

  const router = useRouter();

  const [tab] = useState(true);

  const [paymentOk, paymentPeding] = useWebSocket(payment.identifier);

  const time = new Date(payment.expired_time);

  time.setSeconds(time.getSeconds() + 0);

  const { minutes, seconds, isRunning } = useTimer(time);

  useEffect(() => {
    if (!paymentPeding) {
      if (paymentOk) {
        const payload = {
          orderState: OrderState.COMPLETED,
        };

        dispatch(setOrderState(payload));
      } else {
        const payload = {
          orderState: OrderState.FAILED,
        };

        dispatch(setOrderState(payload));
      }
      router.push("/payment-result");
    }
  }, [paymentPeding]);

  useEffect(() => {
    if (!isRunning) {
      const payload = {
        orderState: OrderState.FAILED,
      };

      dispatch(setOrderState(payload));

      router.push("/payment-result");
    }
  }, [isRunning]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
      <div className="flex flex-col gap-8 ">
        <p className="text-[#002859] font-bold text-xl">Resumen del pedido</p>
        <div className="flex flex-col gap-8  bg-[#F9FAFC] rounded p-8">
          <div>
            <div className="flex justify-between mb-4">
              <p className="text-[#002859] font-bold">Importe:</p>
              <p className="text-[#002859] font-bold">
                {payment.fiat_amount} EUR
              </p>
            </div>
            <hr />
          </div>

          <div>
            <div className="flex justify-between mb-4">
              <p className="text-[#002859] font-bold">Moneda seleccionada:</p>
              <p className="text-[#002859] font-bold">
                {cryptoDictionary[payment.currency_id]}
              </p>
            </div>
            <hr />
          </div>

          <div className="flex justify-between">
            <p className="text-[#002859] font-bold">Comercio:</p>
            <div className="flex gap-1">
              <Image src={verify} alt="verify" />
              <p className="text-[#002859]">Comercio de pruebas de Semega</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-4">
              <p className="text-[#002859] font-bold">Fecha:</p>
              <p className="text-[#002859]">
                {humanReadableDate(payment.created_at)}
              </p>
            </div>
            <hr />
          </div>

          <div className="flex justify-between">
            <p className="text-[#002859] font-bold">Concepto:</p>
            <p className="text-[#002859]">{payment.notes}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex justify-center lg:justify-start w-full">
          <p className="text-[#002859] font-bold text-xl">Realiza el pago</p>
        </div>

        <div className="flex gap-1">
          <Image src={timerPng} alt="timer" />
          <span className="text-[#002859]">{`${minutes}:${seconds}`}</span>
        </div>

        <div className="flex gap-4 items-center">
          <span
            className={` text-[#647184] px-[12px] py-[6px] ${
              tab && "rounded-full bg-[#035AC5] text-white"
            }`}
          >
            Smart QR
          </span>
          <span
            className={` text-[#647184] px-[12px] py-[6px] ${
              !tab && "rounded-full bg-[#035AC5] text-white"
            }`}
          >
            Web3
          </span>
        </div>
        <RenderPaymentMethod address={payment.address} activeTab={tab} />
        <div>
          <p className="text-[#002859]">
            Enviar{" "}
            <span className="font-bold">{`${payment.crypto_amount} ${
              cryptoDictionary[payment.currency_id]
            }`}</span>
          </p>
        </div>
        <p className="text-[#002859]">{payment.address}</p>
        <p className="text-[#002859]">Etiqueta de destino: 2557164061</p>
      </div>
    </div>
  );
}

export default Order;
