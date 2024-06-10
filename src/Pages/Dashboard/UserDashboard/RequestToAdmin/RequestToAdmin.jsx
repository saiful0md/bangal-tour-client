import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const RequestToAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [requested, setRequested] = useState(false);
    console.log(requested);

    const handleRequestToAdmin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosSecure.post('/request-to-admin', { email: user.email });
            if (data.insertedId) {
                setRequested(true);
                Swal.fire({
                    title: "Success!",
                    text: "Your request to become a tour guide has been submitted.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error("An error occurred while submitting the request:", error);
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
                {requested ? (
                    <div role="alert" className="alert alert-success">
                        <span>Your request to become a tour guide has been submitted.</span>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <button onClick={handleRequestToAdmin} className="btn btn-primary">
                            Request to Become a Tour Guide
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestToAdmin;