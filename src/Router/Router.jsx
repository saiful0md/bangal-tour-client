import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Layout/Dashboard';
import Root from '../Layout/Root';
import AllPackages from '../Pages/AllPackages/AllPackages';
import PackagesDetails from '../Pages/AllPackages/PackageDetails/PackagesDetails';
import AddPackage from '../Pages/Dashboard/AdminDashboard/AddPackage/AddPackage';
import AdminProfile from '../Pages/Dashboard/AdminDashboard/AdminProfile/AdminProfile';
import ManagePackages from '../Pages/Dashboard/AdminDashboard/ManagePackages/ManagePackages';
import UsersManage from '../Pages/Dashboard/AdminDashboard/ManageUsers/UsersManage';
import TourAssign from '../Pages/Dashboard/TourGuideDashboard/AssignedTour/TourAssign';
import GuideProfile from '../Pages/Dashboard/TourGuideDashboard/GuideProfile/GuideProfile';
import Booking from '../Pages/Dashboard/UserDashboard/Booking/Booking';
import Payment from '../Pages/Dashboard/UserDashboard/Booking/Payment';
import RequestToAdmin from '../Pages/Dashboard/UserDashboard/RequestToAdmin/RequestToAdmin';
import UserProfile from '../Pages/Dashboard/UserDashboard/UserProfile/UserProfile';
import Wishlist from '../Pages/Dashboard/UserDashboard/Wishlist/Wishlist';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home/Home';
import AllGuides from '../Pages/Home/TravelGuide/AllGuides';
import LogIn from '../Pages/LogIn/LogIn';
import SignUp from '../Pages/SignUp/SignUp';
import TourGuideDetals from '../component/TourGuide/TourGuideDetals';
import AdminRoute from './AdminRoute';
import PriveteRoute from './PriveteRoute';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/allPackages',
                element: <AllPackages></AllPackages>
            },
            {
                path: '/packageDetails/:id',
                element: <PriveteRoute><PackagesDetails></PackagesDetails></PriveteRoute>
            },
            {
                path: '/tourGuideDetails/:id',
                element: <PriveteRoute><TourGuideDetals></TourGuideDetals></PriveteRoute>
            },
            {
                path: '/allGuides',
                element: <AllGuides></AllGuides>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PriveteRoute><Dashboard></Dashboard></PriveteRoute>,
        children: [
            // Admin Routes
            
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'addPackage',
                element: <AdminRoute><AddPackage></AddPackage></AdminRoute>
            },
            {
                path: 'manageUser',
                element: <AdminRoute><UsersManage></UsersManage></AdminRoute>
                
            },
            {
                path: 'managePackages',
                element: <AdminRoute><ManagePackages></ManagePackages></AdminRoute>
            },
            // Tour Guide routes
            {
                path:'guideProfile',
                element:<GuideProfile></GuideProfile>
            },
            {
                path:'assignedTour',
                element:<TourAssign></TourAssign>
            },
            // User Routes
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'bookings',
                element: <Booking></Booking>
            },
            {
                path: 'wishList',
                element: <Wishlist></Wishlist>
            },
            {
                path: 'requset-to-admin',
                element:<RequestToAdmin></RequestToAdmin>
            },
            {
                path: 'payment/:id',
                element:<Payment></Payment>
            }


        ]
    }
]);

export default Router;