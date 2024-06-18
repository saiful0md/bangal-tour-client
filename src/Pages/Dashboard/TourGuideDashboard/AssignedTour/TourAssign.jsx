
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const TourAssign = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: bookingData = [], refetch } = useQuery({
        queryKey: ['booking', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/guideBase/${user.email}`)
            return res?.data
        }
    })



    const handleAcceptAndReject = async (id, status) => {
        
        try {
            const { data } = await axiosSecure.put(`/booking/${id}`, {  status })
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: 'Updated Successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                })
                refetch()
            }
        }
        catch (err) {
            Swal.fire({
                title: "info!",
                text: err,
                icon: 'error',
                timer: 2500,
                showConfirmButton: false,
            })
        }
    };
   
    return (
        <div className="p-8">
            <div className="container mx-auto">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Package</th>
                                <th>Tourist</th>
                                <th> Date</th>
                                <th>Status</th>
                                <th> Price</th>
                                <th>Accept</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingData.map((booking, index) => (
                                <tr key={booking._id}>
                                    <td>{index + 1}</td>
                                    <td>{booking.name}</td>
                                    <td>{booking.userName}</td>
                                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                                    <td>{booking.status}</td>
                                    <td>&#8378;{booking.price}</td>
                                    <td>
                                        <button
                                            disabled={booking.status !== 'In Review'}
                                            onClick={() => handleAcceptAndReject(booking._id, "Accepted")}
                                            className="btn btn-sm bg-green-400"
                                        >
                                            Accept
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            disabled={booking.status !== 'In Review'}
                                            onClick={() => handleAcceptAndReject(booking._id, "Rejected")}
                                            className="btn btn-sm bg-red-400"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
export default TourAssign;