// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import BannerText from '../../../component/BannerText';

const Banner = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper rounded-xl  py-0 px-0 mb-20 h-[500px]"
        >
            <SwiperSlide>
                <div style={{ backgroundImage: 'url(https://i.ibb.co/8KKWBCd/hammock-74190-2012.jpg)' }}
                    className="relative h-[600px] bg-cover  bg-center text-white flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <BannerText
                        heading={"Cox's Bazar"}
                        description={"Cox's Bazar is a town on the southeast coast of Bangladesh. It's known for its very long, sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south. The town has several other beaches on the western side. Inland, the tropical rainforest of Himchari National Park has waterfalls and many birds."}
                    ></BannerText>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div style={{ backgroundImage: 'url(https://i.ibb.co/8zVBm5C/photo-1596374004290-2d0788efc9b0-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg' }}
                    className="relative h-[600px] bg-cover  bg-center text-white flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <BannerText
                        heading={'Barisal'}
                        description={"Barisal is a major city that lies on the bank of Kirtankhola river in south-central Bangladesh. It is the largest city and the administrative headquarter of both Barisal district and Barisal Division. It is one of the oldest municipalities and river ports of the country."}
                    ></BannerText>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div style={{ backgroundImage: 'url(https://i.ibb.co/7gJ0wyq/photo-1627893528424-792f89b0f2d5-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg' }}
                    className="relative h-[600px] bg-cover  bg-center text-white flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <BannerText
                        heading={'Sylhet'}
                        description={"Sylhet is a city in eastern Bangladesh, on the Surma River. It’s known for its Sufi shrines, like the ornate tomb and mosque of 14th-century saint Hazrat Shah Jalal, now a major pilgrimage site near Dargah Mahalla village. The tiny museum inside has exhibits on the saint's life. Nearby, in the gardens of the Bangladesh Tea Research Institute, are sprawling Sylhet tea estates."}
                    ></BannerText>
                </div>
            </SwiperSlide>
        </Swiper >
    );
};

export default Banner;