/* eslint-disable react-hooks/exhaustive-deps */
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai"
import { BiDollar } from 'react-icons/bi'
import ComponentStyle from "./ProductPageComponent.module.scss"
import { useContext, useEffect, useState } from "react"
import baseURL from "../../baseURL"
import { useParams } from "react-router-dom"
import { calcDiscountedPrice, isTokenExpired, refreshTokenHandler } from "../../functions"
import AuthContext from "../Context/AuthContext"

function ProductPageComponent() {

    const otherImages = [
        "https://img.etimg.com/thumb/width-1200,height-900,imgsize-78972,resizemode-75,msid-99739108/top-trending-products/furniture/sofas/best-premium-sofa-sets-to-experience-luxurious-comfort.jpg",
        "https://cdn.barwefurniture.com/wp-content/uploads/2023/10/Mauck2070quot20Velvet20Squ-1276.jpg",
        "https://img.etimg.com/thumb/width-1200,height-900,imgsize-78972,resizemode-75,msid-99739108/top-trending-products/furniture/sofas/best-premium-sofa-sets-to-experience-luxurious-comfort.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/9/348287983/AW/LN/XO/115688690/l-shape-sofa-set-luxury-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/9/348287983/AW/LN/XO/115688690/l-shape-sofa-set-luxury-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/9/348287983/AW/LN/XO/115688690/l-shape-sofa-set-luxury-500x500.jpg",
    ]
    // const rate = 4  // this line is for test!

    const [productInfo, setProductInfo] = useState(null)
    const [rate, setRate] = useState(0)
    const [imageLoaded, setImageLoaded] = useState(true)
    const [mainImageIndex, setMainImageIndex] = useState(0)
    const [userComment, setUserComment] = useState("")
    const [commentFlag, setCommentFlag] = useState(false)
    const { productId } = useParams()

    const authContext = useContext(AuthContext)

    const productAdder = () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (isTokenExpired(userToken.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    authContext.writeTokenInStorage(token)
                    productAdder()
                })
        } else {
            let req_body = { "productId": productInfo._id }
            fetch(`${baseURL}/carts`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(req_body)
            }).then(res => {
                console.log(res)
                return res.json()
            })
        }
    }

    const sendComment = () => {
        if (userComment.trim() === "") {
            setCommentFlag(false)
        } else {
            const userToken = JSON.parse(localStorage.getItem("userToken"))
            if (isTokenExpired(userToken.accessToken)) {
                refreshTokenHandler()
                    .then(token => {
                        authContext.writeTokenInStorage(token)
                        productAdder()
                    })
            } else {
                let req_body = { "review": userComment, "rating": 4 }
                fetch(`${baseURL}/reviews/${productInfo._id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${userToken.accessToken}`,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(req_body)
                }).then(res => {
                    console.log(res)
                    return res.json()
                }).then(data => console.log(data))
            }
        }
    }

    const getComments = (productID) => {
        fetch(`${baseURL}/reviews/${productID}`, {
            method: "GET"
        }).then(res => {
            console.log(res)
            return res.json()
        }).then(data => {
            console.log(data)
        })
    }

    useEffect(() => {
        fetch(`${baseURL}/products/${productId}`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        }).then(res => {
            return res.json()
        }).then(data => { 
            setProductInfo(data)
            setRate(data.rate)
            console.log(data)
            
            getComments(data._id)
        })
    }, [])

    useEffect(() => {
        if (commentFlag) {
            sendComment()
        }
    }, [commentFlag])

    return (
        <>
            <section className={ComponentStyle.ProductDetailSection}>
                {productInfo && <>
                    <div className={ComponentStyle.productPart}>
                        <div className={ComponentStyle.imagesWrapper}>
                            <div className={ComponentStyle.mainImgContainer}>
                                {imageLoaded && productInfo.discount && <span className={ComponentStyle.discountBadge}>{productInfo.discount * 100}%</span>}
                                {imageLoaded ?
                                    // <img src={`${baseURL}/public/${productInfo?.imageUrl}`} alt={productInfo?.title} crossOrigin='false' onError={setImageLoaded(false)} />
                                    <img src={otherImages[mainImageIndex]} alt={productInfo?.title} />
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-photo-off" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#06a99d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M15 8h.01" />
                                        <path d="M7 3h11a3 3 0 0 1 3 3v11m-.856 3.099a2.991 2.991 0 0 1 -2.144 .901h-12a3 3 0 0 1 -3 -3v-12c0 -.845 .349 -1.608 .91 -2.153" />
                                        <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
                                        <path d="M16.33 12.338c.574 -.054 1.155 .166 1.67 .662l3 3" />
                                        <path d="M3 3l18 18" />
                                    </svg>
                                }
                            </div>
                            {otherImages.length ? <div className={ComponentStyle.otherImages}>
                                {otherImages.map((item, i) => (
                                    <img src={otherImages[i]} key={i} onClick={() => setMainImageIndex(i)} alt="product" className={i == mainImageIndex && ComponentStyle.active} />
                                ))}
                            </div> : null}
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
                    </div>
                </>
                }
                {authContext.isLoggedIn && <div className={ComponentStyle.your_comment}>
                    <h4>Leave your comment!</h4>
                    <textarea value={userComment} onChange={e => setUserComment(e.target.value)}></textarea>
                    <button onClick={() => setCommentFlag(true)}>Send</button>
                </div>}
            </section>
        </>
    )
}

export default ProductPageComponent