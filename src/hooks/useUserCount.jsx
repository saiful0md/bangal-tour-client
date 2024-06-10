import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserCount = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: usersCount = 0,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersCount"],
    queryFn: async () => {
      const response = await axiosSecure(`/users/count`);
      return response.data.count;
    },
  });
  return { usersCount, isLoading, refetch };
};

export default useUserCount;
