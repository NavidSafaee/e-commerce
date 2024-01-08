/* eslint-disable react/no-unknown-property */
import st from "./SoftLand_plus_main.module.scss"
import { Link } from "react-router-dom"
import { IoSnow } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { GiSnowman } from "react-icons/gi";
import { TbWorldPin } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import store from "./models.json"
import AOS from 'aos'
import 'aos/dist/aos.css'

function SoftLand_plus_main() {

    AOS.init({
        duration: 500,
        offset: 10
    })

    const randomPosition = () => {
        let delay = Math.floor((Math.random() * 10000) + 1000)
        let left = Math.floor(Math.random() * window.innerWidth)
        let top = Math.floor(Math.random() * window.innerHeight / 2 - 50)
        let fontSize = Math.floor(Math.random() * 20 + 10)
        return { left, top, animationDelay: `${delay}ms`, fontSize }
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
                        Array.from(Array(100).keys()).map((item, i) => (
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
                    <IoSnow className={st.snow} />
                    <GiSnowman className={st.snowman} />
                </article>
                <div className={st.gallery}>
                    <h3 className={st.title}>Gallery</h3>
                    <div className={st.items}>
                    {
                            store.products.map((item, i) => (
                                <div className={st.gallery_item} key={i}>
                                    <div className="sketchfab-embed-wrapper"> <iframe data-aos="zoom-out" style={{ width: 500, height: 300, borderRadius: 20 }} title={item.title} frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src={`https://sketchfab.com/${item.url}/embed`}> </iframe> </div>
                                    <div className={st.product_details}>
                                        <strong data-aos="fade-down" data-aos-delay="200" className={st.product_name}>{item.title}</strong>
                                        <p data-aos="fade-down" data-aos-delay="500" className={st.product_description}>
                                            {item.description}
                                        </p>
                                        <div data-aos="fade-down" data-aos-delay="800" className={st.option_box}>
                                            <span className={st.option_label}><TbWorldPin /> Made in </span><b className={st.value}>{item.made}</b>
                                        </div>
                                        <div data-aos="fade-down" data-aos-delay="1000" className={st.option_box}>
                                            <span className={st.option_label}><RiMoneyDollarCircleLine /> Price: </span><b className={st.value}>$ {item.fee}</b>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={st.gallery}>
                    <h3 className={st.title}>Virtual Reality</h3>
                    <div className={st.items}>
                        {
                            store.models.map((item, i) => (
                                <div className={st.gallery_item} key={i}>
                                    <div className="sketchfab-embed-wrapper"> <iframe data-aos="zoom-out" style={{ width: 500, height: 300, borderRadius: 20 }} title={item.title} frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src={`https://sketchfab.com/${item.url}/embed`}> </iframe> </div>
                                    <div className={st.product_details}>
                                        <strong data-aos="fade-down" data-aos-delay="200" className={st.product_name}>{item.title}</strong>
                                        <p data-aos="fade-down" data-aos-delay="500" className={st.product_description}>
                                            {item.description}
                                        </p>
                                        <div data-aos="fade-down" data-aos-delay="800" className={st.option_box}>
                                            <span className={st.option_label}><TbWorldPin /> Made in </span><b className={st.value}>{item.made}</b>
                                        </div>
                                        <div data-aos="fade-down" data-aos-delay="1000" className={st.option_box}>
                                            <span className={st.option_label}><RiMoneyDollarCircleLine /> Price: </span><b className={st.value}>$ {item.fee}</b>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default SoftLand_plus_main