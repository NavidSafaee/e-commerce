/* eslint-disable react/no-unknown-property */
import st from "./SoftLand_plus_main.module.scss"
import { Link } from "react-router-dom"
import { IoSnow } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import AOS from 'aos'
import 'aos/dist/aos.css'

function SoftLand_plus_main() {

    AOS.init({
        offset: 250,
        duration: 500
    })

    const randomPosition = () => {
        let left = Math.floor(Math.random() * window.innerWidth)
        let top = Math.floor(Math.random() * window.innerHeight - 50)
        let opacity = Math.random() * .5 + .5
        return { left, top, opacity }
    }

    return (
        <>
            <section className={st.pageWrapper}>
                <nav className={st.nav}>
                    <strong className={st.title}>SoftLand +</strong>
                    <Link to={"/"} className={st.home_btn}><IoHome /></Link>
                </nav>
                <div className={st.hero_section}>
                    {
                        Array.from(Array(20).keys()).map((item, i) => (
                            <IoSnow key={i} className={st.snow} style={randomPosition()} />
                        ))
                    }
                    <img className={st.img} data-aos="zoom-in" data-aos-delay="400" src="/general_images/Santa-Claus.png" alt="Santa Claus" />
                    <div className={st.text_box}>
                        <h1 className={st.main_message} data-aos="fade-up" data-aos-delay="800">Merry christmas</h1>
                        <p className={st.greeting} data-aos="fade-up" data-aos-delay="1200">
                            Welcome to Soft Land New Year Festival!
                        </p>
                        <p className={st.text} data-aos="fade-up" data-aos-delay="1600">
                            Here you can see our products in 3D!
                        </p>
                    </div>
                </div>
                <article className={st.about_box}>
                    <h3 className={st.about_title} data-aos="zoom-in">What is SoftLand_plus?</h3>
                    <div className={st.content_box}>
                        <p className={st.about_description} data-aos="fade-left">
                            This festival is held on the occasion of the arrival of the new year. On this page, which has been created with the creativity and innovation of soft land team specialists, you will be able to see and review our latest products live and in 3D; This is not the whole story! Also, the virtual reality design feature allows you to view and review products in a real building so that you can make a more confident judgment.
                            <br /><br />Watch and enjoy!
                        </p>
                        <div className={st.img_box} data-aos="flip-up" data-aos-duration="600">
                            <img src="/general_images/vr.png" alt="VR" />
                            <img src="/general_images/vr.png" alt="VR" />
                        </div>
                    </div>
                    <div className={st.ring1}></div>
                    <div className={st.ring2}></div>
                    <div className={st.ring3}></div>
                </article>
                <div className={st.gallery}>
                <div className="sketchfab-embed-wrapper" style={{width: 700}}> <iframe style={{width: 500, height: 300, borderRadius: 20}} title="Victorian Sofa Set" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/3d-models/the-great-drawing-room-feb9ad17e042418c8e759b81e3b2e5d7/embed"> </iframe> </div>
                <div className="sketchfab-embed-wrapper" style={{width: 700}}> <iframe style={{width: 500, height: 300, borderRadius: 20}} title="Victorian Sofa Set" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/3d-models/home-sweet-home-8ba655c4bf2547cf9246efa865a54b3c/embed"> </iframe> </div>
                </div>
            </section>
        </>
    )
}

export default SoftLand_plus_main