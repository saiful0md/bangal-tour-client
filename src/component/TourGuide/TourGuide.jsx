import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TourGuide = ({ items }) => {
    const { image, name, skills ,_id} = items
    return (
        <div className=" rounded  shadow-lg">
            <img className="w-full h-[300px] object-cover" src={image} alt={name} />
            <div className="px-6  py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base"><span className='font-bold'>Skills:</span> {skills}</p>
               <Link to={`/tourGuideDetails/${_id}`}>
                 <button className=" my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    See Details
                 </button>
               </Link>
            </div>
        </div>
    );
};
TourGuide.propTypes = {
    items: PropTypes.object
}
export default TourGuide;