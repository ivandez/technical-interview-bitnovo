import { MetaMaskProvider } from "@metamask/sdk-react";
import QRCode from "qrcode.react";
import { ConnectWalletButton } from "./ConnectWalletButton";

const host =
  typeof window !== "undefined" ? window.location.host : "defaultHost";

const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Next-Metamask-Boilerplate",
    url: host,
  },
};

export default function RenderPaymentMethod({ address, activeTab }: any) {
  return (
    <>
      {activeTab ? (
        <QRCode value={address} />
      ) : (
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton />
        </MetaMaskProvider>
      )}
    </>
  );
}
