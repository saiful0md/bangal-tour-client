
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const TourAssign = () => {

    const { user } = useAuth();

    const isEnabled = !!user?.email;
    const initialData = [];
    const axiosSecure = useAxiosSecure();

    const { data: guideBookings = [], isLoading, refetch, } = useQuery({
        queryKey: ["guideBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/${user?.email}`);
            return res.data;
        },
        enabled: isEnabled,
        initialData: initialData,
    });
    console.log(guideBookings);
    // reusable function

    const changeStatus = async (id, status) => {
        const response = await axiosSecure.put(
            `/booking?id=${id}&status=${status}`
        );
        return response.data;
    };

    const handleAccept = (id, status) => {
        changeStatus(id, status).then((result) => {
            if (result.acknowledged && result.modifiedCount) {
                Swal.fire({
                    title: "Updated!",
                    text: `This Booking is ${status}.`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
            refetch();
        });
    };
    const handleReject = (id, status) => {
        changeStatus(id, status).then((result) => {
            if (result.acknowledged && result.modifiedCount) {
                Swal.fire({
                    title: "Updated!",
                    text: `Booking is ${status}.`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
            refetch();
        });
    };

    if (isLoading) return "Loading...";
    return (
        <div className="p-8">
            <div className="container mx-auto">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-amber-600 rounded-lg text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Package</th>
                                <th className="py-3 px-4 text-left">Tourist</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left"> Date</th>
                                <th className="py-3 px-4 text-left"> Price</th>
                                <th className="py-3 px-4 text-left">Change Status</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold">
                            {guideBookings &&
                                guideBookings.map((booking, index) => {
                                    return (
                                        <tr
                                            key={user._id}
                                            className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-300" : "bg-blue-600"
                                                }`}
                                        >
                                            <td className="py-3 px-4">{booking.package_title}</td>
                                            <td className="py-3 px-4">{booking.tourist_name}</td>
                                            <td className="py-3 px-4 text-sm">{booking.status}</td>
                                            <td className="py-3 px-4">{booking.order_date}</td>
                                            <td className="py-3 px-4">{booking.package_price}</td>
                                            <td className="flex justify-center items-center px-3 gap-8">
                                                <button
                                                    onClick={() => handleAccept(booking._id, "Accepted")}
                                                    className="p-2 border-none rounded-lg bg-green-400"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(booking._id, "Rejected")}
                                                    className="p-2 border-none rounded-lg bg-red-400"
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default TourAssign;