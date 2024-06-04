import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PriveteRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <div className='max-w-lg mx-auto flex items-center justify-center'>
            <div className="w-16 h-16 border-4  border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        </div>
    }
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>
};
PriveteRoute.propTypes = {
    children: PropTypes.node
}
export default PriveteRoute;