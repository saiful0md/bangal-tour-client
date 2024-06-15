import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGuides = (role = 'guide') => {
    const axiosPublic = useAxiosPublic();
    const { data: guides = [] } = useQuery({
        queryKey: ['users', role = 'guide'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/guide/${role}`)
            return res.data
        }
    })
    return [guides]
};

export default useGuides;