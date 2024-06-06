
import TourGuide from '../../../component/TourGuide/TourGuide';
import useGuides from '../../../hooks/useGuides';

const AllGuides = () => {
    const [guides] = useGuides()
    return (
        <div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 '>
                {
                    guides.map(guide => <TourGuide key={guide._id} items={guide}></TourGuide>)
                }
            </div>
        </div>
    );
};

export default AllGuides;