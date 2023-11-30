/* eslint-disable react-hooks/exhaustive-deps */
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai"
import { BiDollar } from 'react-icons/bi'
import ComponentStyle from "./ProductPageComponent.module.scss"
import { useContext, useEffect, useState } from "react"
import baseURL from "../../baseURL"
import { useParams } from "react-router-dom"
import { calcDiscountedPrice } from "../../functions"
import AuthContext from "../Context/AuthContext"

function ProductPageComponent() {

    // const rate = 4  // this line is for test!

    const [productInfo, setProductInfo] = useState(null)
    const [rate, setRate] = useState(0)
    const { productId } = useParams()

    const authContext = useContext(AuthContext)

    const productAdder = () => {
        let req_body = { "productId": productInfo._id }
        console.log(productInfo._id)
        fetch(`${baseURL}/carts`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${authContext.accessToken}`, "Content-type": "application/json" },
            body: JSON.stringify(req_body)
        }).then(res => {
            console.log(res)
            return res.json()
        }).then(data => console.log(data))
    }

    useEffect(() => {
        fetch(`${baseURL}/products/${productId}`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        }).then(res => {
            return res.json()
        }).then(data => { setProductInfo(data); setRate(data.rate); })
    }, [])

    return (
        <>
            {productInfo && <section className={ComponentStyle.ProductDetailSection}>
                <div className={ComponentStyle.imgContainer}>
                    {productInfo.discount && <span className={ComponentStyle.discountBadge}>{productInfo.discount * 100}%</span>}
                    <img src={`${baseURL}/public/${productInfo?.imageUrl}`} alt={productInfo?.title} crossOrigin='false' />
                </div>
                <div className={ComponentStyle.productDetailContainer}>
                    <h4 className={ComponentStyle.productCategory}>{productInfo?.category}</h4>
                    <h3 className={ComponentStyle.ProductTitle}>{productInfo?.title}</h3>
                    <div className={ComponentStyle.detailRow}>
                        <span className={ComponentStyle.price}><BiDollar />{calcDiscountedPrice(productInfo)}</span>
                        {rate && <div className={ComponentStyle.starsBox}>
                            {
                                Array.from(Array(productInfo.rate).keys())?.map((star, i) => (
                                    <AiTwotoneStar key={i} className={ComponentStyle.coloredStar} />
                                ))
                            }
                            {
                                Array.from(Array(5 - productInfo.rate).keys())?.map((star, i) => (
                                    <AiOutlineStar key={i} className={ComponentStyle.greyStar} />
                                ))
                            }
                        </div>}
                        <span className={ComponentStyle.review}>29 reviews</span>
                    </div>
                    <div className={ComponentStyle.description}>
                        Your choice of seating can make a difference. For any programmer, it’s essential to find something that is both comfortable and ergonomically supportive.
                    </div>
                    <div className={ComponentStyle.btnBox}>
                        <button className={ComponentStyle.addBtn} onClick={productAdder}>Add to Cart</button>
                    </div>
                </div>
            </section>}
        </>
    )
}

export default ProductPageComponent