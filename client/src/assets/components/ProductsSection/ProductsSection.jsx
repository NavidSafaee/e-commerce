import { useEffect, useState } from "react"
import "./ProductsSection.scss"
import ProductCard from "../ProductCard/ProductCard"
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import baseURL from "../../baseURL"

function ProductsSection() {
    const [focusItem, setFocusItem] = useState("All Products")
    const [pageNum, setPageNum] = useState(1)
    const [allProducts, setAllProducts] = useState([])

    const filterItems = ["All Products", "Best Sellers", "New Arrivals", "Todays Deals"]

    useEffect(() => {
        fetch(`${baseURL}/products`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => { setAllProducts(data.products); console.log(data); })
    }, [])

    return (
        <section className="products-section">
            <h3 className="products-title">OUR PRODUCTS</h3>
            <div className="products-section-row">
                {
                    filterItems.map((item, i) => (
                        <span
                            key={i}
                            className={`filter-item ${(focusItem == filterItems[i]) && "focus"}`}
                            onClick={() => setFocusItem(item)}
                        >
                            {item}
                        </span>
                    ))
                }
            </div>
            <div className="products-container">
                {
                    allProducts?.map(item => (
                        <ProductCard
                            key={item._id}
                            {...item}
                        />
                    ))
                }
            </div>
            <div className="pagination-wrapper">
                <div className="pagination-box">
                    <span className="pagination-btn prev-btn" onClick={() => setPageNum(pre => pre = pre - 1)}><BiSolidLeftArrow /></span>
                    <div className="pages-numbers">
                        <span className={`number ${(pageNum == 1) && "current-page"}`} onClick={() => setPageNum(1)}>1</span>
                        <span className={`number ${(pageNum == 2) && "current-page"}`} onClick={() => setPageNum(2)}>2</span>
                        <span className={`number ${(pageNum == 3) && "current-page"}`} onClick={() => setPageNum(3)}>3</span>
                        <span className={`number ${(pageNum == 4) && "current-page"}`} onClick={() => setPageNum(4)}>4</span>
                        <span className={`number ${(pageNum == 5) && "current-page"}`} onClick={() => setPageNum(5)}>5</span>
                    </div>
                    <span className="pagination-btn next-btn" onClick={() => setPageNum(pre => pre = pre + 1)}><BiSolidRightArrow /></span>
                </div>
            </div>
        </section>
    )
}

export default ProductsSection