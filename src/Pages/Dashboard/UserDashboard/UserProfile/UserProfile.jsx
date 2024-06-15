import { Helmet } from "react-helmet-async";
import Profile from "../../Common/Profile";


const UserProfile = () => {

    return (
        <>
            <Helmet>
                <title>Bangal Tour | Profile</title>
            </Helmet>
            <Profile></Profile>
        </>
    );
};

export default UserProfile;