

import { useState } from "react";
import Select from 'react-select';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useGetUsers from "../../../../hooks/useGetUsers";
const UsersManage = () => {


    const axiosSecure = useAxiosSecure();
    const [name, setName] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    // const itemPerPage = 10;
    // const numberOfPages = Math.ceil(usersCount / itemPerPage);

    // const pages = [...Array(numberOfPages).keys()];

    // passing values to custom hook
    const { users, isLoading, refetch } = useGetUsers(name, selectedRole,  );
    // react select options
    const options = [
        { value: "admin", label: "Admin" },
        { value: "guide", label: "Guide" },
        { value: "tourist", label: "Tourist" },
    ];

    const handleUserRole = async (role, roleStatus, email) => {

        const response = await axiosSecure.patch(`/users/update/${email}`, { role, roleStatus });
        console.log(response.data);
        if (response.data.modifiedCount > 0) {
            Swal.fire({
                title: "Updated!",
                text: `User role updated to ${role}.`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            refetch();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        setName(name);

        refetch();
    };

    return (
        <div>
            <div className="container text-center  my-2 ">
                <h1 className="text-center  text-2xl mb-4">Search User</h1>
                <form
                    onSubmit={handleSearch}
                    className="flex items-center  justify-center gap-2"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="h-12 px-4 border"
                    />
                    <Select
                        options={options}
                        onChange={(selectedOption) => setSelectedRole(selectedOption.value)}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused ? "grey" : "green",
                                height: 50,
                            }),
                        }}
                    />
                    <button type="submit" className="h-12 text-white  bg-amber-600 px-2">
                        {isLoading ? <div className='max-w-lg mx-auto flex items-center justify-center'>
                            <div className="w-16 h-16 border-4  border-dashed rounded-full animate-spin"></div>
                        </div> : "Search"}
                    </button>
                </form>
            </div>
            <div className="p-8">
                <div className="container mx-auto">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Make Admin</th>
                                    <th>Make Tour Guide</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.roleStatus}</td>
                                        <td className={`font-medium 
                                    ${user.role === 'admin' && 'text-yellow-500'} 
                                    ${user.role === 'guide' && 'text-green-600'} 
                                    ${user.role === 'tourist' && 'text-info'}`}>
                                            {user.role}
                                        </td>
                                        <td>
                                            <button
                                                disabled={user.role !== "tourist"}
                                                onClick={() => handleUserRole("admin", 'verified', user.email)}
                                                className="btn btn-sm"
                                            >
                                                Make Admin
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleUserRole("guide", 'verified', user.email)}
                                                disabled={user.role !== "tourist"}
                                                className="btn btn-sm"
                                            >
                                                Make Tour Guide
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
               
            </div>
        </div>
    );
};


export default UsersManage;