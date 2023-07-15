import { Outlet } from "react-router-dom"
import Header from './Header'
const Layout = ()=>{
    return(
        <>
        <Header/>
        <div className="px-6 md:py-4 md:px-8 flex flex-col min-h-screen">
            <Outlet />
        </div>
        </>
    )
}

export default Layout