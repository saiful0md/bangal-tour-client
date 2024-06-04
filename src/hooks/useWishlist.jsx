import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useWishlist = () => {
   const axiosSecure = useAxiosSecure()
   const {user}=useAuth()
   const [wishList, refetch]= useQuery({
    queryKey:['wishlist', user?.email],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/wishList?email=${user.email}`)
        return res.data
    }
   })
   return [wishList, refetch]
};

export default useWishlist;