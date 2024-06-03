
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const TravelGuide = () => {
  
      
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
                    <h2>Overview</h2>
                    {/* Add your overview content here */}
                </TabPanel>

                <TabPanel>
                    {/* Our Packages Content */}
                    <h2>Our Packages</h2>
                    {/* Add your packages content here */}
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