'use client'

import Image from "next/image";
import {client} from "./client";
import { ConnectButton, SocialProfile } from "thirdweb/react";
import { useEffect, useState } from "react";
import { getSocialProfiles } from "thirdweb/social";
import { shortenAddress } from "thirdweb/utils";

type FilterType = "all" | "ens" | "farcaster" | "lens";

const isValidEthereumAddress = (address: string) => {
  return /^0x[a-fA-f0-9]{40}$/.test(address);
}

export default function Home() {

  const [searchInput, setSearchInput] = useState("");
  const [searchedAddress, setSearchedAddress] = useState("");
  const [userProfiles, setUserProfiles] = useState<SocialProfile[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);


  useEffect(() => {
    setIsValidAddress(isValidEthereumAddress(searchInput));
    console.log(isValidAddress);
  }, [searchInput])

  const handleSearch = async () => {
    console.log("Inside")
    if(!isValidAddress) return;

    console.log("Here")

    setIsLoading(true);
    setSearchedAddress(searchInput);
    try {

      console.log("Reached")

      const profiles = await getSocialProfiles({
        address: searchedAddress, 
        client: client
      });

      console.log(profiles);

      setUserProfiles(profiles);
      setHasSearched(true);
    } catch(e) {
      alert(e);
    } finally {
      setIsLoading(false);
      setSearchInput("");
    }
  }

  const filteredProfiles = userProfiles.filter(profile => 
    activeFilter === "all" || profile.type === activeFilter
  );

 

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
          className="bg-blue-600 text-white px-4 py-5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2"
          onClick={() => handleSearch()}
          disabled={isLoading || !isValidAddress}
          >
            {isLoading ? "Searching" : "Search"}
          </button>

        </div>

        {searchInput && !isValidAddress && (
          <p className="text-red-500 text-xs text-left mt-1">Please enter valid Ethereum address</p>
        )}

        {hasSearched && (
          <>
            <p className="text-sm text-gray-400 mb-4">Search results for: {shortenAddress(searchedAddress)} </p>
            <div className="flex space-x-2 bg-zinc-800 p-1 rounded-lg">
              {["all", "ens", "farcaster", "lens"].map((filter) => (
                <a
                  key={filter}
                  className={`px-3 py-2 text-small font-medium rounded-md transition-colors ${activeFilter === filter ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-zinc-700 hover:text-white"}`}
                  onClick={() => setActiveFilter(filter as FilterType)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </a>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
              {isLoading ? (
                Array(3).fill(0).map((_, index) => <CardSkeleton key={index} />)
              ) : hasSearched && filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile, index) => (
                  <div key={index} className="w-full h-full">
                    {profile.type === "ens" && <ENSCard profile={profile} />}
                    {profile.type === "farcaster" && <FarcasterCard profile={profile} />}
                    {profile.type === "lens" && <LensCard profile={profile} />}
                  </div>
                ))
              ) : hasSearched ? (
                <p className="text-center text-gray-500 col-span-full">No profile found for this address</p>
              ): null}
            </div>
          </>
        )}
      </div>

    </main>
  );
}
