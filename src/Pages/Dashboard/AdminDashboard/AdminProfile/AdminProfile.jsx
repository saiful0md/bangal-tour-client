import { Helmet } from "react-helmet-async";
import Profile from "../../Common/Profile";


const AdminProfile = () => {
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | Admin Profile</title>
            </Helmet>
            <Profile></Profile>
        </div>
    );
};

export default AdminProfile;