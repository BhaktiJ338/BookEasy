import { Outlet } from "react-router-dom"
import Header from './Header'
const Layout = ()=>{
    return(
        <>
        <Header/>
        <div className="py-4 px-8 flex flex-col min-h-screen">
            
            <Outlet />
        </div>
        </>
    )
}

export default Layout