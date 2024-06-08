import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleMakeTourGuide = (user) => {

    }
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-around items-center mt-10">
                <h2 className="text-3xl font-semibold  ">All Users</h2>
                <h2 className="text-lg p-4 font-semibold  badge badge-warning">{users.length}</h2>
            </div>
            <div className="overflow-x-auto my-10 ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role Admin</th>
                            <th>Role Tour Guide</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' :
                                        <button
                                            disabled={user.role === 'Admin' || user.role === 'Tour Guide'}
                                            onClick={() => handleMakeAdmin(user)} className='btn btn-sm'>Make Admin</button>}

                                    {user.role === 'tour guide' ? 'Tour Guide' :
                                        <button
                                            disabled={user.role === 'Admin' || user.role === 'Tour Guide'}
                                            onClick={() => handleMakeTourGuide(user)} className='btn btn-sm'>Make Tour Guide</button>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;