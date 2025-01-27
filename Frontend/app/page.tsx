import Image from "next/image";
import {client} from "./client";
import { ConnectButton } from "thirdweb/react";

export default function Home() {
  return (
    <div>
      <ConnectButton client={client} />

    </div>
  );
}
