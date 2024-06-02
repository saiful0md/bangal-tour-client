import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layout/Root';
import Home from '../Pages/Home/Home';
import LogIn from '../Pages/LogIn/LogIn';
import SignUp from '../Pages/SignUp/SignUp';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
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
            }
        ]
    },
]);

export default Router;