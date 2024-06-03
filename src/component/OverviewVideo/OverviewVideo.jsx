import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './Overview.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const video1 = 'https://videos.pexels.com/video-files/1739010/1739010-sd_640_360_30fps.mp4'
const video2 = 'https://videos.pexels.com/video-files/5139026/5139026-sd_640_360_30fps.mp4'
const OverviewVideo = () => {
    return (
     
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
            <video src={video1} controls  muted className="" ></video>
            </SwiperSlide>
            <SwiperSlide>
            <video src={video2} controls  muted className="" ></video>
            </SwiperSlide>
            <SwiperSlide>
            <video src={video1} controls  muted className="" ></video>
            </SwiperSlide>
            <SwiperSlide>
            <video src={video1} controls  muted className="" ></video>
            </SwiperSlide>
            <SwiperSlide>
            <video src={video1} controls  muted className="" ></video>
            </SwiperSlide>
            <SwiperSlide>
            <video src={video1} controls  muted className="" ></video>
            </SwiperSlide>
        </Swiper>
    );
};

export default OverviewVideo;