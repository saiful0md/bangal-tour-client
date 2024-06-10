import { Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Footer/Footer";
import Navbar from "../Pages/Home/Navbar/Navbar";


const Root = () => {
    return (
        <div>
            <div className="max-w-7xl px-3">
                <Navbar></Navbar>
            </div>
            <div className="max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;