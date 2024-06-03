import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {
    const { user, logOut, } = useAuth()
    const location = useLocation()
    const isHomePage = location.pathname === '/';
    const navbarClass = isHomePage ? "bg-black bg-opacity-30 text-white" : "bg-white text-black";
    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }
    const navLinks = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/community'}>Community</NavLink></li>
        <li><NavLink to={'/blogs'}>Blogs</NavLink></li>
        <li><NavLink to={'/aboutUs'}>About Us</NavLink></li>
        <li><NavLink to={'/contactUs'}>Contact Us</NavLink></li>
        {
            user ? <>

                <button onClick={handleSignOut} className='btn-ghost px-3 rounded-lg  lg:mr-2'>SignOut</button>
                <div className="dropdown dropdown-end text-black">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="" src={user?.photoURL} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button>{user?.displayName}</button></li>
                        <li><button>{user?.email}</button></li>
                        <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                    </ul>
                </div>
            </> : <>
                <li><NavLink className='' to={'/login'}>Login</NavLink></li>
            </>
        }
    </>
    return (

        <div className={`navbar fixed max-w-6xl z-10 ${navbarClass}`}>
            <div className="flex-1">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to={'/'}>
                    <img src="https://i.ibb.co/TH9qJRg/Orange-and-Blue-Travel-Agency-Logo.png" alt="" />
                </Link>
            </div>
            <div className=" hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;