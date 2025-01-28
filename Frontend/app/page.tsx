'use client'

import Image from "next/image";
import {client} from "./client";
import { ConnectButton, SocialProfile } from "thirdweb/react";
import { useEffect, useState } from "react";

type FilterType = "all" | "ens" | "farcaster" | "lens";

const isValidEthereumAddress = (address: string) => {
  return /^0x[a-fA-f0-9]{40}$/.test(address);
}

export default function Home() {

  const [searchInput, setSearchInput] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [userProfiles, setUserProfiles] = useState<SocialProfile[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);


  useEffect(() => {
    setIsValidAddress(isValidEthereumAddress(searchInput));
  }, [searchInput])

 

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-8 text-neutral-200">Find Me Web3</h1>

        <div className="flex flex-row items-center justify-center mb-4">

          <input 
          type="text"
          placeholder="Enter wallet address"
          className={`bg-zinc-800 text-neutral-200 border border-zinc-700 rounded-md ${!isValidAddress && searchInput ? 'innput-error' : ''}`}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          disabled={isLoading}
          />

          <button
          className="bg-blue-600 text-white px-4 py-5 rounded-md hover:bg-blue-700"
          onClick={() => {}}
          disabled={isLoading || isValidAddress}
          >
            {isLoading ? "Searching" : "Search"}
          </button>

        </div>
      </div>

    </main>
  );
}
