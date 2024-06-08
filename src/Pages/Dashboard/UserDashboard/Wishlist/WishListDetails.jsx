import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet-async";
import { ImCross } from "react-icons/im";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useGuides from "../../../../hooks/useGuides";
import TourGuideTable from "../../../AllPackages/PackageDetails/TourGuideTable";

const WishListDetails = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false)
    const [tourGuide, setTourGuide] = useState('')
    const [packagedata, setPackage] = useState([])
    const { id } = useParams()
    const [guides] = useGuides()
    useEffect(() => {
        const loadData = async () => {
            try {
                const  data  = await axiosSecure.get(`/wishList/${id}`);
                console.log("Data received:", data.data);
                setPackage(data);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: 'Failed to load package details',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
            }
        };
        loadData();
    }, [axiosSecure, id])
    const { name, image1, image2, image3, image4, price, description, type } = packagedata;

    // modale confirm
    const handleBooking = e => {
        e.preventDefault();
        setShowModal(true)
    }
    const handleBookedConfirm = async (e) => {
        e.preventDefault();
        const userName = user.displayName;
        const userEmail = user.email;
        const userImage = user.photoURL;
        const date = startDate;
        const guide = tourGuide;
        const tourData = {
            name,
            userName,
            userImage,
            userEmail,
            date,
            guide,
            price,
            image1,
            image2,
            image3,
            image4,
        }

        try {
            const { data } = await axiosSecure.post(`/booking`, tourData)
            if (data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: 'Booked Successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                })
                setShowModal(false)
                // navigate('/bookedServices')
            }
        }
        catch (err) {
            Swal.fire({
                title: "info!",
                text: err.response.data,
                icon: 'error',
                timer: 2500,
                showConfirmButton: false,
            })
            setShowModal(false)
        }

    }
    return (
        <div className="my-10 px-2">
            <Helmet>
                <title>Bangal Tour | Package Details</title>
            </Helmet>
            <div>
                <div className="flex justify-center items-center gap-6 my-10 border-b-2 pb-6">
                    <h2 className="text-3xl font-bold"> Wishlist Details</h2>
                </div>
                <div className="card  bg-base-100 shadow-xl rounded-none">
                    <div className="grid md:grid-cols-2 gap-3">
                        <figure><img className="h-[300px] w-full " src={image1} alt={name} /></figure>
                        <figure><img className="h-[300px] w-full " src={image2} alt={name} /></figure>
                        <figure><img className="h-[300px] w-full " src={image3} alt={name} /></figure>
                        <figure><img className="h-[300px] w-full " src={image4} alt={name} /></figure>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title"><span className="font-bold">Name:</span> {name}</h2>
                        <p><span className="font-bold">Details:</span> {description}</p>
                        <p><span className="font-bold">Typs:</span> {type}</p>
                        <p><span className="font-bold">Price:</span> &#8378;{price}</p>
                    </div>
                </div>
            </div>
            {/* Tour plan */}

            {/* Guides  */}
            <div>
                <h2 className="text-3xl font-semibold mt-10">Meet Our Guides</h2>
                <div className="overflow-x-auto my-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>contact details</th>
                                <th>View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                guides.map((item, index) => <TourGuideTable key={item._id} item={item} index={index}></TourGuideTable>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Booking form */}
            <h1 className="lg:text-5xl text-2xl font-bold  text-center">Book Now</h1>
            <form className="card-body relative">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col  gap-1">
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text"> Package Name</span>
                            </label>
                            <input type="text" name="name" readOnly defaultValue={name} placeholder="" className="input input-bordered" required />
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Tourist Name</span>
                            </label>
                            <input type="text" name="userName" readOnly defaultValue={user?.displayName} placeholder="" className="input input-bordered" required />
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Tourist Email</span>
                            </label>
                            <input type="text" name="userEmail" readOnly defaultValue={user?.email} placeholder="" className="input input-bordered" required />
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Tourist PhotoUrl</span>
                            </label>
                            <input type="text" name="" readOnly defaultValue={user?.photoURL} placeholder="" className="input input-bordered" required />
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" name="price" readOnly defaultValue={price} placeholder="Price" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Tourist Date</span>
                            </label>
                            <DatePicker className="p-3 border w-full rounded-lg outline-none shadow-sm" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Tour guide name</span>
                            </label>
                            <select value={tourGuide}
                                className="border outline-none p-3 rounded-lg"
                                onChange={(e) => setTourGuide(e.target.value)}>
                                <option value="">Select Tour Guide</option>
                                {
                                    guides.map(guide => <option key={guide._id} value={guide.name}>{guide.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button
                        onClick={handleBooking}
                        className="btn  bg-amber-500 text-white hover:bg-amber-600 ">
                        Book Now
                    </button>
                </div>
                {showModal &&
                    <div className="hero-content flex-col h-[300px] w-[500px] absolute top-1/3 bottom-1/2 left-[320px] z-10 ">
                        <div className="card shadow-2xl w-full h-full bg-base-100">
                            <div onClick={() => { setShowModal(false) }} className="cursor-pointer bg-rose-600 hover:bg-rose-700 w-8 h-8 flex items-center justify-center rounded-full ml-6 mt-6">
                                <ImCross className="text-white"></ImCross>
                            </div>
                            <div className="flex flex-col gap-6 items-center">
                                <h2 className="text-4xl">Confirm your Booking</h2>
                                <p>Are you sure you want to book this package?</p>
                                <button onClick={handleBookedConfirm} className="btn  bg-amber-500 text-white hover:bg-amber-600 ">Confirm</button>
                            </div>
                        </div>
                    </div>
                }
            </form>
        </div >
    );
};

export default WishListDetails;