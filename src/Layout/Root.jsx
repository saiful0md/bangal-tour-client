import { Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Footer/Footer";
import Navbar from "../Pages/Home/Navbar/Navbar";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-6xl mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;