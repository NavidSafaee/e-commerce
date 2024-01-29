/* eslint-disable react/prop-types */
import './ProductCard.scss'
import { LuStar } from 'react-icons/lu'
import { MdStar } from "react-icons/md"
import { FiEye } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCartPlus } from 'react-icons/bs'
import baseURL from '../../baseURL'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { calcDiscountedPrice } from '../../functions'

// eslint-disable-next-line react/prop-types
function ProductCard({ _id, title, imageUrl, rate, category, status, discount, price }) {
  let coloredStars = Array.from(Array(4).keys())
  let greyStars = Array.from(Array(5 - 4).keys())

  const [imageLoaded, setImageLoaded] = useState(true)

  return (
    <Link to={`/products/${_id}`} className="product-card">
      {
        (status === "New") && <span className='status new-product'>New</span>
      }
      {
        (status === "Sale") && <span className='status sale'>Sale</span>
      }
      <div className="img-wrapper">
          {
            imageLoaded ?
              <img src={`${baseURL}/${imageUrl.slice(0, 22)}/${imageUrl.slice(22)}`} alt={title} crossOrigin='false' onError={() => setImageLoaded(false)} />
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
        <div className="icon-wrapper"><AiOutlineHeart className='action-icon heart-icon' /></div>
        <div className="icon-wrapper"><FiEye className='action-icon eye-icon' /></div>
        <div className="icon-wrapper"><BsCartPlus className='action-icon cart-icon' /></div>
      </div>
      <div className="detail-box">
        <span className="categoryName">
          {category}
        </span>
        <b className="product-name">{title}</b>
      </div>
      <div className="end-row">
        <div className="price-part">
          <span className='current-price'>${discount !== undefined ? calcDiscountedPrice({discount, price}) : price}</span>
          {discount !== undefined && <span className="old-price">${price}</span>}
        </div>
        {rate !== null && <div className="rate-box">
          {
            coloredStars.map((star, i) => (
              <MdStar key={i} className='colored-star' />
            ))
          }
          {
            greyStars.map((star, i) => (
              <LuStar key={i} className='grey-star' />
            ))
          }
        </div>}
      </div>
    </Link>
  )
}

export default ProductCard