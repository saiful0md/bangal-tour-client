import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";


const SocialLogIn = () => {
    const axiosPublic = useAxiosPublic()
    const { googleSignin } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/';
    const handleGoogleLogin = () => {
        googleSignin()
            .then(result => {
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data) {
                            Swal.fire({
                                icon: 'success',
                                title: "Sign in successfully"
                            })
                        }
                        navigate(from, {replace:true})
                    })
            })
    }
    return (
        <div onClick={handleGoogleLogin} className="flex items-center border-[rgba(68,68,68,1)] border p-2 gap-3 cursor-pointer rounded-lg hover:bg-[#D1A054] hover:text-white">
            <FcGoogle  className="text-3xl"></FcGoogle> <span className="text-md">continue with google</span>
        </div>
    );
};

export default SocialLogIn;