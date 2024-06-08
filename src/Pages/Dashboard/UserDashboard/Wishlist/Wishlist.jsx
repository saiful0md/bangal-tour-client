import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: wishList = [], refetch } = useQuery({
        queryKey: ['wishList', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`wishList/${user?.email}`)
            return res.data
        }
    })
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
                axiosSecure.delete(`/wishList/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: ` ${error}`,
                            icon: "error",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    });
            }
        });
    }
 
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | Wishlist</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center items-center gap-6 my-10 border-b-2 pb-6">
                    <h2 className="text-3xl font-bold">My Wishlist</h2>
                    <div className="badge badge-warning">{wishList.length}</div>
                </div>
                {wishList.length === 0 ? (
                    <div role="alert" className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>No items in the wishlist.</span>
                    </div>
                ) : <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>View Details</th>
                                <th>Delete</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                wishList?.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14">
                                                    <img src={item.image1} alt={item.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td> {item.type}</td>
                                    <td> &#8378;{item.price}</td>
                                    <th>
                                        <Link to={`/dashboard/wishList/${item._id}`} className="btn btn-ghost btn-xs"><FaEye className="text-lg"></FaEye></Link>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs"><FaTrashAlt className="text-lg"></FaTrashAlt></button>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>}
            </div>
        </div>
    );
};

export default Wishlist;