import { ReactNode } from 'react'
import SidebarComponent from '@/components/Sidebar';

 const MainLayout= ({children}) => {
    return(
        <div className='flex flex-row'>
            <SidebarComponent/>
            <main>{children}</main>
        </div>
    )
}

export default MainLayout