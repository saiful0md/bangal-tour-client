import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useGuide = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isGuide, isLoading: isGuideLoading } = useQuery({
        queryKey: ['isGuide', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/guides/${user.email}`)
            return res.data.guide
        }
    })
    return [isGuide, isGuideLoading]
};

export default useGuide;