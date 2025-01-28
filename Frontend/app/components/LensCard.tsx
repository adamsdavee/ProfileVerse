import React from "react";
import { MediaRenderer, SocialProfile } from "thirdweb/react";
import { client } from "../client";

interface LensCardProps {
  profile: SocialProfile;
}

const LensCard = ({ profile }: LensCardProps) => {
  const lensMetadata = profile.metadata as { handle?: string };

  return (
    <div className="max-w-xs bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Card Content */}
      <div className="p-4 flex flex-col items-center">
        {/* Badge */}
        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md mb-4">
          Lens
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
          {profile.name || lensMetadata.handle || "Unnamed Lens"}
        </h2>
        {profile.bio && (
          <p className="text-sm text-gray-400 text-center">{profile.bio}</p>
        )}

        {/* Buttons */}
        <div className="mt-4 w-full space-y-2">
          <a
            href={`https://hey.xyz/u/${profile.name || lensMetadata.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-lg text-center hover:bg-blue-600 transition-colors duration-300"
          >
            View on Hey
          </a>
          <a
            href={`https://warpcast.com/${profile.name || lensMetadata.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-purple-500 text-white text-sm font-medium py-2 rounded-lg text-center hover:bg-purple-600 transition-colors duration-300"
          >
            View on Orb
          </a>
        </div>
      </div>
    </div>
  );
};

export default LensCard;
