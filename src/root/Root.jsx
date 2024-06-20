import SideBar from "../components/sidebar/sidebar"
import { Outlet } from "react-router-dom"

export default function Root() {
    return <div className="wrapper">
        <SideBar />
        <main style={{marginLeft: '370px', marginTop: '20px'}}>
            <Outlet />
        </main>
    </div>
}