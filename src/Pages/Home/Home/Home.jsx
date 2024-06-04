import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import TravelGuide from "../TravelGuide/TravelGuide";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | Home</title>
            </Helmet>
            <div className="max-w-[1210px] mx-auto">
                <Banner></Banner>
            </div>
            <TravelGuide></TravelGuide>
        </div>
    );
};

export default Home;