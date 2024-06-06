import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Layout/Dashboard';
import Root from '../Layout/Root';
import AllPackages from '../Pages/AllPackages/AllPackages';
import PackagesDetails from '../Pages/AllPackages/PackageDetails/PackagesDetails';
import AddPackage from '../Pages/Dashboard/AdminDashboard/AddPackage/AddPackage';
import AdminProfile from '../Pages/Dashboard/AdminDashboard/AdminProfile/AdminProfile';
import ManagePackages from '../Pages/Dashboard/AdminDashboard/ManagePackages/ManagePackages';
import ManageUsers from '../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import UserProfile from '../Pages/Dashboard/UserDashboard/UserProfile/UserProfile';
import Wishlist from '../Pages/Dashboard/UserDashboard/Wishlist/Wishlist';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home/Home';
import AllGuides from '../Pages/Home/TravelGuide/AllGuides';
import LogIn from '../Pages/LogIn/LogIn';
import SignUp from '../Pages/SignUp/SignUp';
import TourGuideDetals from '../component/TourGuide/TourGuideDetals';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<LogIn></LogIn>
            },
            {
                path:'/signUp',
                element:<SignUp></SignUp>
            },
            {
                path:'/allPackages',
                element:<AllPackages></AllPackages>
            },
            {
                path:'/packageDetails/:id',
                element:<PackagesDetails></PackagesDetails>
            },
            {
                path:'/tourGuideDetails/:id',
                element:<TourGuideDetals></TourGuideDetals>
            },
            {
                path:'/allGuides',
                element:<AllGuides></AllGuides>
            }
        ]
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'wishList',
                element:<Wishlist></Wishlist>
            },
            {
                path:'userProfile',
                element:<UserProfile></UserProfile>
            },
            {
                path:'adminProfile',
                element:<AdminProfile></AdminProfile>
            },
            {
                path:'addPackage',
                element:<AddPackage></AddPackage>
            },
            {
                path:'manageUser',
                element:<ManageUsers></ManageUsers>
            },
            {
                path:'managePackages',
                element:<ManagePackages></ManagePackages>
            }
        ]
    }
]);

export default Router;