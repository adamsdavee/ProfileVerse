import React from "react";
import { MediaRenderer, SocialProfile } from "thirdweb/react";
import { client } from "../client";
import { shortenAddress } from "thirdweb/utils";

interface ENSCardProps {
  profile: SocialProfile;
}

const ENSCard = ({ profile }: ENSCardProps) => {
  const ensMetadata = profile.metadata as { address?: string };

  return (
    <div className="max-w-xs bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Card Content */}
      <div className="p-4 flex flex-col items-center">
        {/* Badge */}
        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md mb-4">
          ENS
        </span>

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
          {profile.avatar ? (
            <MediaRenderer
              client={client}
              src={profile.avatar}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">?</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <h2 className="text-lg font-semibold text-white text-center mb-1">
          {profile.name || "Unnamed ENS"}
        </h2>
        {ensMetadata.address && (
          <p className="text-xs text-gray-400 bg-zinc-700 border border-zinc-600 rounded-full px-3 py-1 mt-2">
            {shortenAddress(ensMetadata.address)}
          </p>
        )}

        {/* Button */}
        <a
          href={`https://app.ens.domains/${profile.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-lg text-center hover:bg-blue-600 transition-colors duration-300"
        >
          View on ENS
        </a>
      </div>
    </div>
  );
};

export default ENSCard;
