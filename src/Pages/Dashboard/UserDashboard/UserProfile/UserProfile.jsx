import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";


const UserProfile = () => {
    const { user } = useAuth()
    const { displayName, email, photoURL } = user
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | User Profile</title>
            </Helmet>
            <div className="max-w-2xl mx-auto my-10">
                <h2 className="text-3xl font-semibold text-center my-10 ">My Profile</h2>
                <div className="card  bg-base-100 shadow-xl">
                    <figure><img className="h-[500px] w-full" src={photoURL} alt={displayName} /></figure>
                    <div className="card-body">
                        <h2><span className="font-bold">Name:</span> {displayName}</h2>
                        <p><span className="font-bold">Email:</span> {email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;