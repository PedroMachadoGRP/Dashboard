
import SideBar from '@/components/layout/sideBar'
import React from 'react'

export default function dashBoardLayout({ children }: { children: React.ReactNode }){

    return(
        <div className='flex min-h-screen'>
            <SideBar/>
            <main className='flex-1 p-6'>
                {children}
            </main>
        </div>
    )
}

