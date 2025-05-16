import React from 'react';

export const TasksSkeleton: React.FC = () => {
    return(
        <div className='flex flex-col w-full max-w-5xl px-5 py-7 gap-2 bg-slate-300 rounded-lg h-72'>
            <div className='block h-12 p-2.5 bg-neutral-100 first:rounded-t-xl last:rounded-b-xl rounded-md animate-pulse' />
            <div className='block h-12 p-2.5 bg-neutral-100 first:rounded-t-xl last:rounded-b-xl rounded-md animate-pulse' />
            <div className='block h-12 p-2.5 bg-neutral-100 first:rounded-t-xl last:rounded-b-xl rounded-md animate-pulse' />
            <div className='block h-12 p-2.5 bg-neutral-100 first:rounded-t-xl last:rounded-b-xl rounded-md animate-pulse' />
        </div>
    )
}