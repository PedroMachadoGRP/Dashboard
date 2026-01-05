import React from 'react'

export default function ActivityGroupModal(props:{title:string,desc:string}) {
    return (
        <div className='flex flex-col  bg-violet-800 text-neutral-200 p-2  m-1 rounded-[15] w-60 h-full '>
            <h2 className='text-neutral-50'>
                {props.title}
            </h2>
            <p className='text-neutral-300 line-clamp-5 break-all'>
                {props.desc}
            </p>
        </div>
    )
}
