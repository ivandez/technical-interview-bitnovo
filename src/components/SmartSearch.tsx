import { Currency } from "@/util/network/domain/interfaces";
import React, { Dispatch, SetStateAction, useState } from "react";
import closePNG from "../../public/add.png";
import Image, { StaticImageData } from "next/image";
import bitcoincashPNG from "../../public/Master-Crypto.png";
import etherPNG from "../../public/Group.png";
import xrpPNG from "../../public/XRP.png";
import usdcPNG from "../../public/usdc.png";
import arrowRight from "../../public/arrow-right.png";

type Props = {
  setValue: any;
  setOpenSelect: Dispatch<SetStateAction<boolean>>;
  currencies: Currency[];
};

const cryptoDictionary: {
  [index: string]: { name: string; symbol: string; image: StaticImageData };
} = {
  BCH_TEST: { name: "Bitcoin Cash", symbol: "BTH", image: bitcoincashPNG },
  BTC_TEST: { name: "Bitcoin", symbol: "BTC", image: bitcoincashPNG },
  ETH_TEST3: { name: "Ethereum", symbol: "ETH", image: etherPNG },
  XRP_TEST: { name: "Ripple", symbol: "XRP", image: xrpPNG },
  USDC_TEST3: { name: "USD Coin", symbol: "USDC", image: usdcPNG },
};

const SmartSearch = ({ setValue, setOpenSelect, currencies }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter names based on search term
  const filteredNames = currencies.filter((crypto: any) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white absolute w-full h-full">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <p className="text-[#002859] font-bold text-lg">
            Seleccionar criptomoneda
          </p>
          <Image
            src={closePNG}
            alt="test"
            className="inline cursor-pointer"
            onClick={() => setOpenSelect(false)}
          />
        </div>
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="rounded border-[#647184] border-solid border-[1px] px-3 py-[18px]"
        />
        <div className="flex flex-col gap-3 mt-2">
          {filteredNames.map((item: any, index: any) => (
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer "
              onClick={() => {
                setValue("currency_id", item.symbol);
                setOpenSelect(false);
              }}
              key={index}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={cryptoDictionary[item.symbol].image}
                  width={32}
                  height={32}
                  alt="test"
                  className="inline"
                />
                <div>
                  <p className="font-semibold">
                    {cryptoDictionary[item.symbol].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {cryptoDictionary[item.symbol].symbol}
                  </p>
                </div>
              </div>
              <Image
                src={arrowRight}
                alt="select"
                className="inline cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartSearch;
