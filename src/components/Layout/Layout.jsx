import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../Routes/Routers";

function Layout() {
    return (
        <>
            <div>
                <Header/>
                <Routers/>
            </div>
            <Footer/>
        </>
    );
}

export default Layout;
