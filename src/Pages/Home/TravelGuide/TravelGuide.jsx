
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OverviewVideo from '../../../component/OverviewVideo/OverviewVideo';
import PackageCart from '../../../component/PackageCart';
import TourGuide from '../../../component/TourGuide/TourGuide';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useGuides from '../../../hooks/useGuides';


const TravelGuide = () => {
    const axiosPublic = useAxiosPublic();
    const { data: packages = [], } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/packages')
            return res.data
        }
    })

    const [guides] = useGuides()
    return (
        <div className='md:p-2 p-2 lg:p-0 max-w-6xl mx-auto'>
            <Tabs>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                <TabPanel>
                    {/* Overview Content */}
                    <OverviewVideo></OverviewVideo>
                </TabPanel>

                <TabPanel>
                    {/* Our Packages Content */}
                    <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-6 '>
                        {
                            packages.slice(0, 3).map(item => <PackageCart key={item._id} item={item}></PackageCart>)
                        }
                    </div>
                    <div className='flex justify-center'>
                        <Link to={'/allPackages'}>
                            <button className='bg-amber-500 hover:bg-amber-600 rounded-lg  text-white px-6 py-2 my-10'>All Packages</button>
                        </Link>
                    </div>
                </TabPanel>

                <TabPanel>
                    {/* Meet Our Tour Guides Content */}
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 '>
                        {
                            guides.slice(0, 3).map(guide => <TourGuide key={guide._id} items={guide}></TourGuide>)
                        }
                    </div>
                    <div className='flex justify-center'>
                        <Link to={'/allGuides'}>
                            <button className='bg-amber-500 hover:bg-amber-600 rounded-lg  text-white px-6 py-2 my-10'>All Packages</button>
                        </Link>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TravelGuide;