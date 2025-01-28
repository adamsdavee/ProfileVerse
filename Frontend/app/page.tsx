'use client';

import { client } from "./client";
import { SocialProfile } from "thirdweb/react";
import { useEffect, useState } from "react";
import { getSocialProfiles } from "thirdweb/social";
import { shortenAddress } from "thirdweb/utils";
import CardSkeleton from "./components/CardSkeleton";
import ENSCard from "./components/ENSCard";
import FarcasterCard from "./components/FarcasterCard";
import LensCard from "./components/LensCard";

type FilterType = "all" | "ens" | "farcaster" | "lens";

const isValidEthereumAddress = (address: string) => {
  return /^0x[a-fA-f0-9]{40}$/.test(address);
};

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedAddress, setSearchedAddress] = useState("");
  const [userProfiles, setUserProfiles] = useState<SocialProfile[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);

  // Support wallet address
  const supportWalletAddress = "0x103ed903c8D0E77abC6B8CA6B73Ef064196aD849";

  useEffect(() => {
    setIsValidAddress(isValidEthereumAddress(searchInput));
  }, [searchInput]);

  const handleSearch = async () => {
    if (!isValidAddress) return;

    setIsLoading(true);
    setSearchedAddress(searchInput);
    setHasSearched(false);
    try {
      const profiles = await getSocialProfiles({
        address: searchInput,
        client: client,
      });
      setUserProfiles(profiles);
      setHasSearched(true);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
      setSearchInput("");
    }
  };

  const filteredProfiles = userProfiles.filter(
    (profile) => activeFilter === "all" || profile.type === activeFilter
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(supportWalletAddress);
    alert("Wallet address copied to clipboard!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-300 flex flex-col items-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
          Find Me Web3
        </h1>
        <p className="text-gray-400 text-base">
          Discover Web3 profiles effortlessly.
        </p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col items-center w-full max-w-2xl space-y-4 md:space-y-0 md:flex-row md:space-x-4 mb-8">
        <input
          type="text"
          placeholder="Enter Ethereum wallet address"
          className={`w-full md:w-auto flex-grow bg-zinc-800 border ${
            !isValidAddress && searchInput ? "border-red-500" : "border-zinc-700"
          } text-gray-300 placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition ${
            !isValidAddress || isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSearch}
          disabled={isLoading || !isValidAddress}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {searchInput && !isValidAddress && (
        <p className="text-red-500 text-sm mb-4">
          Please enter a valid Ethereum address.
        </p>
      )}

      {/* Results Section */}
      {hasSearched && (
        <div className="w-full max-w-5xl">
          <p className="text-sm text-gray-400 mb-6">
            Search results for:{" "}
            <span className="text-gray-200 font-semibold">
              {shortenAddress(searchedAddress)}
            </span>
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2 bg-zinc-800 p-2 rounded-lg">
              {["all", "ens", "farcaster", "lens"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-zinc-700 hover:text-white"
                  }`}
                  onClick={() => setActiveFilter(filter as FilterType)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => <CardSkeleton key={index} />)
              : filteredProfiles.length > 0
              ? filteredProfiles.map((profile, index) => (
                  <div key={index}>
                    {profile.type === "ens" && <ENSCard profile={profile} />}
                    {profile.type === "farcaster" && (
                      <FarcasterCard profile={profile} />
                    )}
                    {profile.type === "lens" && <LensCard profile={profile} />}
                  </div>
                ))
              : hasSearched && (
                  <p className="text-center text-gray-500 col-span-full">
                    No profiles found for this address.
                  </p>
                )}
          </div>
        </div>
      )}

      {/* Support Me Section */}
      <div className="mt-12 p-6 bg-zinc-800 rounded-lg shadow-md text-center max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-200 mb-2">
          Support This Project ❤️
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Send tokens to support this project and its development.
        </p>
        <div className="bg-zinc-900 p-3 rounded-lg flex items-center justify-between">
          <span className="text-gray-300 text-sm">
            {shortenAddress(supportWalletAddress)}
          </span>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}
