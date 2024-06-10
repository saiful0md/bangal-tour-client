import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUsers = (name = "", role = "", page = 1, size = 10) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", name, role, page, size],
    queryFn: async () => {
      const response = await axiosSecure(
        `/users?name=${name}&role=${role}&page=${page}&size=${size}`
      );
      return response.data;
    },
  });
  return { users, isLoading, refetch };
};

export default useGetUsers;
