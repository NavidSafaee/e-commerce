/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
// import trendsList from "./TrendProducts.json"
import './TrensSection.scss'

function TrensSection() {
    const [focusItem, setFocusItem] = useState("Top Products")
    const [trendProducts, setTrendProducts] = useState([])

    const filterItems = ["Top Products", "New Arrivals", "Best Sellers"]

    useEffect(() => {
        fetch("http://localhost:8080/products", {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => { setTrendProducts(data.products) })
    }, [])

    return (
        <section className='trends-section'>
            <h3 className='trends-title'>TRENDING</h3>
            <div className="trend-items-row">
                {
                    filterItems.map((item, i) => (
                        <span
                            key={i}
                            className={`trend-item ${(focusItem == filterItems[i]) && "focus"}`}
                            onClick={() => setFocusItem(item)}
                        >
                            {item}
                        </span>
                    ))
                }
            </div>
            <div className="trend-items-wrapper">
                {
                    trendProducts?.map(item => (
                        <ProductCard
                            key={item._id}
                            title={item.title}
                            category={item.category}
                            rate={item.rate}
                            price={item.price}
                            newPrice={item.newPrice}
                            status={item.status}
                            img={item.imageUrl}
                            discount={item.discount}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default TrensSection