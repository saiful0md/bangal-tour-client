import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const RequestToAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userData = [], } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    const userInfo = {
        email: user.email,
        role: 'tourist',
        roleStatus: 'requested'
    }
    const handleRequestToAdmin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosSecure.put('/users', userInfo);
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Your request to become a tour guide has been requested.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    title: "info!",
                    text: "Please wait for Admin confirmition.",
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "info!",
                text: "Please wait for Admin confirmition.",
                icon: "info",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | Request to Admin</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center items-center gap-6 my-10 border-b-2 pb-6">
                    <h2 className="text-3xl font-bold">Request to Become a Tour Guide</h2>
                </div>
                {userData.roleStatus === 'requested' ? (
                    <div  className="alert alert-success text-white">
                        <span>Your request to become a tour guide has been submitted.</span>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <button onClick={handleRequestToAdmin} className="btn bg-amber-500 text-white">
                            Request to Become a Tour Guide
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestToAdmin;