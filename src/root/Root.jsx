import SideBar from "../components/sidebar/sidebar"
import Navbar from "../components/navbar/Navbar"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export default function Root() {

    const [isVisible, setVisibles] = useState(false);
    const [mainStyle, setMainStyle] = useState(false);
    const [mainStyles, setMainStyles] = useState({marginLeft: '375px', marginTop: '30px'});


    const toggleSidebar = () => {
        setVisibles(!isVisible);
        setMainStyle(!mainStyle)
        if(!mainStyle) {
            setMainStyles({marginLeft: '0px', marginTop: '30px'});
        } else {
            setMainStyles({marginLeft: '375px', marginTop: '30px'});
        }
    }

    return <div className="wrapper">
        <SideBar isVisible={isVisible} />
        <Navbar toggleSidebar={toggleSidebar} isVisible={isVisible} />
        <main style={mainStyles}>
            <Outlet />
        </main>
    </div>
}