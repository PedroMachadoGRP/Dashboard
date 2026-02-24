
import SideBar from '@/components/layout/sideBar'
import React from 'react'

export default function dashBoardLayout({ children }: { children: React.ReactNode }){

    return(
        <div className='flex '>
            <SideBar/>
            <main className='flex-1  '>
                {children}
            </main>
        </div>
    )
}

