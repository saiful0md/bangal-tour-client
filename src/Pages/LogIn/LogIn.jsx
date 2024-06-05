import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../component/SocialLogin";
import useAuth from "../../hooks/useAuth";


const LogIn = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        title: "Sign in Success!",
                        text: "Sign in Successfully.",
                        icon: "success"
                    });
                    navigate(location.state || '/')
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error,
                    icon: "error"
                });
            })
    }

    return (
        <div className=" h-[900px] pt-12">
            <Helmet>
                <title>Bangal Tour | Login</title>
            </Helmet>
            <div className="max-w-6xl mx-auto  " >
                <div className="hero-content flex-col gap-10 lg:flex-row py-12  " >
                    <img src={''} alt="" />
                    <div className="card shrink-0 w-full max-w-md  ">
                        <h1 className="text-5xl text-black text-center py-6 font-bold">Login Now</h1>
                        <form onSubmit={handleLogin} className="card-body ">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-4">
                                <input className="btn bg-[#D1A054] text-white" type="submit" value="Login" />
                            </div>
                            <Link to={'/signUp'} className="text-[#D1A054] text-center font-medium">New here? Create a New Account</Link>
                        </form>
                        <div className="text-center">
                            <div className="flex gap-6 justify-center">
                                {/* google */}
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;