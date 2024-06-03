
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OverviewVideo from '../../../component/OverviewVideo/OverviewVideo';
import PackageCart from '../../../component/PackageCart';
import usePackages from '../../../hooks/usePackages';


const TravelGuide = () => {
    const [packages] = usePackages()

    return (
        <div>
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
                    <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            packages.map(item => <PackageCart key={item._id} item={item}></PackageCart>)
                        }
                    </div>
                    <div className='flex justify-center'>
                        <Link to={'/allPackages'}>
                            <button className='bg-amber-500 hover:bg-amber-600 rounded-lg  text-white px-6 py-2 mt-10'>All Packages</button>
                        </Link>
                    </div>
                </TabPanel>

                <TabPanel>
                    {/* Meet Our Tour Guides Content */}
                    <h2>Meet Our Tour Guides</h2>
                    {/* Add your tour guides content here */}
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TravelGuide;