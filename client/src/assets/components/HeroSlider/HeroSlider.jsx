import { useState } from 'react';
import sliderProducts from "./sliderProductsDetail.json"
import style from './HeroSlider.module.scss'

function HeroSlider() {

    const [selectedProductID, setSelectedProductID] = useState(0)

    return (
        <div className={style.slider_section}>
            <div className={style.slider_box}>
                <div className={style.main_box}>
                    <div className={style.text_box}>
                        <p className={style.top_text}>
                            TOP COLLECTIONS 2024
                        </p>
                        <p className={style.bold_text}>
                            We Serve Your Dream Furniture!
                        </p>
                        <p className={style.off_text}>
                            Get 50% off all products
                        </p>
                        <button className={style.buy_btn}>SHOP NOW</button>
                    </div>
                    <img
                        src={`/general_images/slider-imgs/${sliderProducts.products[selectedProductID].imgFileName}`}
                        alt="sofa"
                    />
                </div>
                <div className={style.sidebar}>
                    {
                        sliderProducts.products.map(product => (
                            <div className={`${style.item} ${(selectedProductID === product.id) && style.selected}`} key={product.id} onClick={() => setSelectedProductID(product.id)}>
                                <img src={`/general_images/slider-imgs/${product.imgFileName}`} alt="sofa" />
                                <span className={style.price}>${product.price}</span>
                                <b className={style.product_title}>{product.title}</b>
                            </div>
                        ))
                    }
                </div>
                <div className={style.circles_box}>
                    <span className={`${style.circle} ${selectedProductID == 0 && style.focus}`} onClick={() => setSelectedProductID(0)}></span>
                    <span className={`${style.circle} ${selectedProductID == 1 && style.focus}`} onClick={() => setSelectedProductID(1)}></span>
                    <span className={`${style.circle} ${selectedProductID == 2 && style.focus}`} onClick={() => setSelectedProductID(2)}></span>
                </div>
            </div>
        </div>
    )
}

export default HeroSlider