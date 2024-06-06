import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
const PackageCart = ({ item }) => {
    const { name, image1, type, price, _id } = item;
    const { user } = useAuth()
    const navigate = useNavigate();
    const location = useLocation()
    const axiosSecure = useAxiosSecure()

    const toggleWishlist = async () => {
        if (user && user.email) {
            const packageInfo = {
                email: user.email,
                name,
                image1,
                price,
                type
            }
            try {
                const { data } = await axiosSecure.post(`/wishList`, packageInfo)
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: 'Booked Successfully',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    })

                    navigate('/dashboard/wishList')
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

            }
            // axiosSecure.post('/wishList', packageInfo)
            //     .then(res => {
            //         if (res.data.insertedId) {
            //             Swal.fire({
            //                 title: `${name} Added wishlist`,
            //                 timer: 2000,
            //                 icon: 'success',
            //                 showConfirmButton:false
            //             })
            //         }

            //     })
            // .then(res=>{
            //     console.log(error);
            // })
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "please login to add to wishlist!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes,Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(location?.state || '/logIn')
                }
            });
        }
    }
    return (
        <div className=" rounded  shadow-lg">
            <img className="w-full h-[300px]" src={image1} alt={name} />
            <div className="px-6  py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base"><span className="font-bold">Type:</span> {type}</p>
                <p className="text-gray-700 text-base"><span className="font-bold">Price:</span> &#8378;{price}</p>
                <div className='flex items-center justify-between'>
                    <button className=" my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        <Link to={`/packageDetails/${_id}`}>View Package</Link>
                    </button>
                    <button><FaHeart onClick={toggleWishlist}
                    // className={`text-2xl ${isWishlist ? 'active' : ''}`}
                    ></FaHeart></button>
                </div>
            </div>
        </div>
    );
};
PackageCart.propTypes = {
    item: PropTypes.object,
}
export default PackageCart;