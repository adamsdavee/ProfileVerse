import React from "react";
import { MediaRenderer, SocialProfile } from "thirdweb/react";
import { client } from "../client";

interface FarcasterCardProps {
  profile: SocialProfile;
}

const FarcasterCard = ({ profile }: FarcasterCardProps) => {
  const farcasterMetadata = profile.metadata as {
    fid?: string;
    display_name?: string;
  };

  return (
    <div className="max-w-xs bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Card Content */}
      <div className="p-4 flex flex-col items-center">
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
            </div>
          )}
        </div>

        {/* Profile Info */}
        <h2 className="text-lg font-semibold text-white text-center mb-1">
          {profile.name || "Unnamed Farcaster"}
        </h2>
        {farcasterMetadata.display_name && (
          <p className="text-sm text-gray-400">{farcasterMetadata.display_name}</p>
        )}
        {farcasterMetadata.fid && (
          <span className="mt-2 text-xs text-gray-400 border border-gray-600 rounded-full px-3 py-1">
            FID: {farcasterMetadata.fid}
          </span>
        )}

        {/* Bio */}
        {profile.bio && (
          <p className="mt-3 text-sm text-gray-300 text-center leading-tight">
            {profile.bio}
          </p>
        )}

        {/* Button */}
        <a
          href={`https://warpcast.com/${profile.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-lg text-center hover:bg-blue-600 transition-colors duration-300"
        >
          View on Warpcast
        </a>
      </div>
    </div>
  );
};

export default FarcasterCard;
