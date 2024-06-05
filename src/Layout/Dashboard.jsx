import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin = true
    return (
        <div className="flex">
            <Helmet>
                <title>Bangal Tour | Dashboard</title>
            </Helmet>
            <div className="w-64 min-h-screen bg-amber-500 text-white">
                <div className="mb-10 mt-6 pl-6 shadow-2xl border border-black bg-gray-600 bg-opacity-60  mx-2 rounded-lg">
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
                                <li><NavLink to={'/dashboard/userBookings'}>My Bookings</NavLink></li>
                                <li><NavLink to={'/dashboard/wishList'}>My Wishlist</NavLink></li>
                                <li><NavLink to={'/dashboard/reqAsmin'}>Request to Admin</NavLink></li>
                            </>
                    }
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;