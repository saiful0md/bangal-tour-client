import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AddPackage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const handleAddPackage = async e => {
        e.preventDefault();
        const form = e.target;
        const image1 = form.packageImage1.value;
        const image2 = form.packageImage2.value;
        const image3 = form.packageImage3.value;
        const image4 = form.packageImage4.value;
        const name = form.name.value;
        const description = form.description.value;
        const price = form.price.value;
        const type = form.type.value;
        const date = startDate
        const packagedata = {
            image1,
            image2,
            image3,
            image4,
            name,
            description,
            type,
            price,
            date
        }
        console.log(packagedata);
        try {
            const { data } = await axiosSecure.post(`/packages`, packagedata)
            if (data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: 'Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                navigate('/dashboard/managePackages')
            }
            console.log(data);
        }
        catch (err) {
            console.log(err);
            Swal.fire({
                title: "Oops!",
                text: err.message,
                icon: 'error',
                confirmButtonText: 'try again'
            })
        }
    }
    return (
        <div className=" min-h-screen my-12">
            <Helmet>
                <title>Bangal Tour | Add-Package</title>
            </Helmet>
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add Package</h1>
                </div>
                <div className="card  w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleAddPackage} className="card-body w-full">
                        {/* form row 1 */}
                        <div className="flex gap-4">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text"> Image</span>
                                </label>
                                <input type="text" name="packageImage1" placeholder="photoUrl" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text"> Image</span>
                                </label>
                                <input type="text" name="packageImage2" placeholder="photoUrl" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text"> Image</span>
                                </label>
                                <input type="text" name="packageImage3" placeholder="photoUrl" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text"> Image</span>
                                </label>
                                <input type="text" name="packageImage4" placeholder="photoUrl" className="input input-bordered" required />
                            </div>
                        </div>
                        {/* form row 2 */}
                        <div className="flex gap-4">

                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Package Name</span>
                                </label>
                                <input type="text" name="name" placeholder="package Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <DatePicker className="px-4 border-2 rounded-lg w-full py-2.5 outline-none" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>


                        </div>
                        {/* 3 row */}
                        <div className="flex gap-4">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Type</span>
                                </label>
                                <input type="text" name="type" placeholder="Type" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="text" name="price" placeholder="Price" className="input input-bordered" required />
                            </div>
                        </div>
                        {/* 4 row */}
                        <div className="flex gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input type="text" name="description" placeholder="Description" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn  bg-amber-500 text-white hover:bg-amber-600 ">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPackage;