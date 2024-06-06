import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: wishList = [], refetch } = useQuery({
        queryKey: ['wishList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`wishList/${user.email}`)
            return res.data
        }
    })
    console.log(wishList);

    // const [wishListData, setWishListData] = useState([])
    // useEffect(() => {
    //     const wishlistData = async () => {
    //         const data = await axiosSecure.get(`wishList/${user.email}`)
    //         setWishListData(data.data)
    //     }
    //     wishlistData()
    // }, [axiosSecure, user.email])


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
                                timer:2000,
                                showConfirmButton:false,
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | Wishlist</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center my-10 border-b-2 pb-6">
                    <h2 className="text-3xl font-bold">All Packages</h2>
                </div>
                <div className="overflow-x-auto">
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
                                wishList.map((item, index) => <tr key={item._id}>
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
                                        <button className="btn btn-ghost btn-xs"><FaTrashAlt className="text-lg"></FaTrashAlt></button>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs"><FaTrashAlt className="text-lg"></FaTrashAlt></button>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;