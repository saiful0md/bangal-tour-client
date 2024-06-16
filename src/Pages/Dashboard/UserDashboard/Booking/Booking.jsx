import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const Booking = () => {
    const [showModal, setShowModal] = useState(false)
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
         const { data: bookingData = [], refetch } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/${user?.email}`)
            return res?.data
        }
    })      
   
    // handleDelete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/booking/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handlePay = () => {
        setShowModal(true)
        console.log('submit pay');
    }
    const handlePayConfirm =() =>{

    }
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | Booking</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center items-center gap-6 my-10 border-b-2 pb-6">
                    <h2 className="text-3xl font-bold">My Booking</h2>
                    <div className="badge badge-warning">{bookingData.length}</div>
                </div>
                {bookingData.length === 0 ? (
                    <div role="alert" className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>No items in the booking list.</span>
                    </div>
                ) : <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Tour Guide Name</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Pay</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookingData?.map((booking, index) => <tr key={booking._id}>
                                    <th>{index + 1}</th>
                                    <td>{booking.name}</td>
                                    <td> {booking.guide.map(guideInfo => guideInfo.name)}</td>
                                    <td> &#8378;{booking.price}</td>
                                    <td> {new Date(booking.date).toLocaleDateString()}</td>
                                    <td> {booking.status}</td>
                                    <th>
                                        <button
                                            className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white"
                                            onClick={() => handlePay(booking._id)}
                                            disabled={booking.status !== 'Accepted'}
                                        >Pay</button>
                                    </th>
                                    <th>
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            disabled={booking.status !== 'In Review'}
                                            className="btn btn-ghost btn-xs"
                                        >
                                            <FaTrashAlt className="text-lg" />
                                        </button>
                                    </th>
                                </tr>
                                )
                            }

                        </tbody>

                    </table>
                </div>
                }
            </div>
             {/* modal code */}
             {showModal &&
                    <div className="hero-content flex-col h-[300px] w-[500px] absolute top-1/3 bottom-1/2 left-[320px] z-10 ">
                        <div className="card shadow-2xl w-full h-full bg-base-100">
                            <div onClick={() => { setShowModal(false) }} className="cursor-pointer bg-rose-600 hover:bg-rose-700 w-8 h-8 flex items-center justify-center rounded-full ml-6 mt-6">
                                <ImCross className="text-white"></ImCross>
                            </div>
                            <div className="flex flex-col gap-6 items-center">
                                <h2 className="text-4xl">Confirm your Booking</h2>
                                <p>Are you sure you want to book this package?</p>
                                <button onClick={handlePayConfirm} className="btn  bg-amber-500 text-white hover:bg-amber-600 ">Confirm</button>
                            </div>
                        </div>
                    </div>
                }
        </div>
    );
};

export default Booking;