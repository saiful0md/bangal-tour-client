import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import TravelGuide from "../TravelGuide/TravelGuide";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bangal Tour | Home</title>
            </Helmet>
            <div className="max-w-[1240px] mx-auto">
                <Banner></Banner>
            </div>
            <div className='max-w-6xl mx-auto my-12 px-2'>
                <TravelGuide></TravelGuide>
            </div>
        </div>
    );
};

export default Home;