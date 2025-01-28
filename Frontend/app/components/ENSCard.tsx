import React from 'react'
import { MediaRenderer, SocialProfile } from 'thirdweb/react'
import { client } from '../client';
import { shortenAddress } from 'thirdweb/utils';

interface ENSCardProps {
    profile: SocialProfile;
}

const ENSCard = ({profile} : ENSCardProps) => {

    const ensMetadata = profile.metadata as {address?: string};


  return (
    <div className='w-full h-full bg-zinc-800 rounded-xl shadow-lg animate-pulse'>
    <div className='p-6 flex flex-col justify-between h-full'>
        <div>
            <span className='mb-2 bg-blue-600 text-white text-xs font-semibold'>ENS</span>
            <div className='flex flex-row mt-4'>
                <div className='mr-4 w-24 h-24 rounded-full'>
                    {profile.avatar ? (
                        <MediaRenderer
                        client={client}
                        src={profile.avatar}
                        className='w-full h-full rounded-full object-cover'
                        />
                    ) : (
                        <div className='w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
                            <div className='w-full h-full bg-gradient-to-br from-blue-400 to-purple-500'></div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col h-fit'>
                    <h2 className='card-title'>{profile.name || "Unamed ENS"} </h2>
                    <p className='text-xs text-gray-500 border border-gray-500 rounded-lg px-2 py-1 inline-block mt-2 flex items-center'>{shortenAddress(ensMetadata.address as string)}</p>
                </div>

            </div>
        </div>

            <div className='mt-6 w-full'>
                <a href={`https://app.ens.domains/${profile.name}`} target='_blank' rel='noopener norefferer' className='btn w-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/50'>
                View on ENS</a>
            </div>
    </div>
  
</div>
  )
}

export default ENSCard
