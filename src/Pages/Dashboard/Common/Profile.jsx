import useAuth from "../../../hooks/useAuth";
import useGetUserByEmail from "../../../hooks/useGetUserByEmail";


const Profile = () => {
    const { user } = useAuth()
    const [userData] = useGetUserByEmail()
    return (
        <div className='max-h-screen flex items-center justify-center max-w-3xl mx-auto'>
            <div className="max-w-2xl mx-auto my-10  w-full">
                <h2 className="text-3xl font-semibold text-center my-10 ">My Profile</h2>
                <div className="card  bg-base-100 shadow-xl">
                    <figure><img className="h-24 w-24 rounded-full" src={user?.photoURL} alt={userData.name} /></figure>
                    <div className='flex justify-center mt-4 items-center'>
                        <h2 className='badge badge-accent'>{userData.role}</h2>
                    </div>
                    <div className="card-body items-center">
                        <h2><span className="font-bold">Name:</span> {userData.name}</h2>
                        <p><span className="font-bold">Email:</span> {userData.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;