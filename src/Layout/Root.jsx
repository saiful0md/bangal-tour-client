import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Home/Navbar/Navbar";


const Root = () => {
    return (
        <div>
            <div className="mt-4">
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;