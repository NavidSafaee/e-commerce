import style from "./HeroSection.module.scss"
import Typewriter from 'typewriter-effect'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './swiper.css';

// import required modules
import { EffectCards, Autoplay } from 'swiper/modules';

function HeroSection() {
    return (
        <>
            <section className={style.heroSectionWrapper}>
                <div className={style.textWrapper}>
                    <h1 className={style.mainTitle}>Soft Land</h1>
                    <h3 className={style.message}>Home and office furniture shopping center</h3>
                    <div className={style.slogan}>
                        <Typewriter
                            options={{
                                strings: [
                                    "We make life more beautiful!",
                                    "Fill your office with beautiful furniture!",
                                    "Making houses into homes!",
                                    "Furnish your home, furnish your life!",
                                    "We’ll furnish your dreams!",
                                    "Style your home your way!",
                                    "For the comfort you deserve!",
                                    "Fill your home with comfor!t"
                                ],
                                autoStart: true,
                                loop: true,
                                delay: 50,
                                deleteSpeed: 10
                            }}
                        />
                    </div>
                </div>
                <div className={style.swiperWrapper}>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        speed={2000}
                        autoplay={{
                            delay: 0
                        }}
                        modules={[EffectCards, Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src="./../../../../public/general_images/heroSwiper/design1.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="./../../../../public/general_images/heroSwiper/design2.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="./../../../../public/general_images/heroSwiper/design3.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="./../../../../public/general_images/heroSwiper/design5.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="./../../../../public/general_images/heroSwiper/design6.png" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section >
        </>
    )
}

export default HeroSection