import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const Dashboard = () => {
    const { logOut } = useAuth();
    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }
    const [isAdmin] = useAdmin()
    return (
        <div className="flex">
            <Helmet>
                <title>Bangal Tour | Dashboard</title>
            </Helmet>
            <div className="w-64 min-h-screen lg:flex lg:flex-col bg-amber-500 text-white">
                <div className="mb-10 mt-6 pl-6 shadow-2xl border border-black bg-neutral-900 bg-opacity-60  mx-2 py-4 rounded-lg">
                    <Link to={'/'}>
                        <img src="https://i.ibb.co/TH9qJRg/Orange-and-Blue-Travel-Agency-Logo.png" alt="" />
                    </Link>
                </div>
                <ul className="menu">
                    {
                        isAdmin ?

                            <>
                                <li><NavLink to={'/dashboard/adminProfile'}>My Profile</NavLink></li>
                                <li><NavLink to={'/dashboard/addPackage'}>Add Package</NavLink></li>
                                <li><NavLink to={'/dashboard/manageUser'}>Manage User</NavLink></li>
                                <li><NavLink to={'/dashboard/managePackages'}>Manage packages</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to={'/dashboard/userProfile'}>My Profile</NavLink></li>
                                <li><NavLink to={'/dashboard/bookings'}>My Bookings</NavLink></li>
                                <li><NavLink to={'/dashboard/wishList'}>My Wishlist</NavLink></li>
                                <li><NavLink to={'/dashboard/reqAsmin'}>Request to Admin</NavLink></li>
                            </>
                    }
                    {/* sheard menu */}
                    <div className="divider"></div>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/allPackages'}>All Pakages</NavLink></li>
                    <li><NavLink to={'/contact'}>Contact Us</NavLink></li>
                    <li><NavLink to={'/about'}>About Us</NavLink></li>
                    <li><button onClick={handleSignOut}>Log Out </button></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;