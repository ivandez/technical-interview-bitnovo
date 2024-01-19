import QRCode from "qrcode.react";
const date = new Date("2024-01-19T17:27:58.094653+01:00");

const humanReadableDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

console.log(humanReadableDate);

const Payment = () => {
  return (
    <div>
      <QRCode value="tb1qaks64aadx6pspt6zcdnc3838l9l89l90h7u9gy" />
    </div>
  );
};

export default Payment;
