import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin = true
    return (
        <div className="flex">
            <div className="w-64 h-screen bg-amber-300 text-white">
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