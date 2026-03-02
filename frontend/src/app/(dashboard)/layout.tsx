
import SideBar from '@/components/layout/sideBar'
import React from 'react'

export default function dashBoardLayout({ children }: { children: React.ReactNode }){

    return(
        <div className='flex bg-gray-100 dark:bg-[#0A0A0A] '>
            <SideBar/>
            <main className='flex-1  '>
                {children}
            </main>
        </div>
    )
}

