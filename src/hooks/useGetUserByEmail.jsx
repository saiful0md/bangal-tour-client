import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useGetUserByEmail = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userData = [], } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    return [userData]
};

export default useGetUserByEmail;