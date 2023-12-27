import './TopBar.scss'
import { Link } from 'react-router-dom'
import { ImSearch } from 'react-icons/im'
import { FiArrowDownCircle } from 'react-icons/fi'
import { useState } from 'react'

function TopBar() {

    const [selectedCollection, setSelectedCollection] = useState("Sofa")
    const [selectListOpen, setSelectListOpen] = useState(false)

    return (
        <>
            <div className="top-bar">
                <div className="brand-box">
                    <img src="/general_images/logo.png" alt="logo" />
                    <Link to={"/"}><strong className='brand-name'>Soft Land</strong></Link>
                </div>
                <div className="search-box">
                    <input type="text" placeholder='Search here' />
                    <div className="search-filter-select-box">
                        <span
                            className="selected-collection"
                            onMouseEnter={() => setSelectListOpen(true)}
                            onMouseLeave={() => setSelectListOpen(false)}
                        >
                            {selectedCollection} {<FiArrowDownCircle />}
                        </span>
                        <ul
                            className={`search-filter-select-list ${selectListOpen && "opened"}`}
                            onMouseLeave={() => setSelectListOpen(false)}
                            onMouseEnter={() => setSelectListOpen(true)}
                        >
                            <li className='filter-item' onClick={() => {setSelectedCollection("Sofa"); setSelectListOpen(false)}}>Sofa</li>
                            <li className='filter-item' onClick={() => {setSelectedCollection("Lamp"); setSelectListOpen(false)}}>Lamp</li>
                            <li className='filter-item' onClick={() => {setSelectedCollection("TV"); setSelectListOpen(false)}}>TV</li>
                            <li className='filter-item' onClick={() => {setSelectedCollection("Kitchen"); setSelectListOpen(false)}}>Kitchen</li>
                        </ul>
                    </div>
                    <span className="search-btn"><ImSearch /></span>
                </div>

                <div className="stories_container">
                    <div className="story_item"><img src="./../../../../public/general_images/story/elon.png" /></div>
                    <div className="story_item"><img src="./../../../../public/general_images/story/pavel.png" /></div>
                    <div className="story_item"><img src="./../../../../public/general_images/story/elon.png" /></div>
                    <div className="story_item"><img src="./../../../../public/general_images/story/pavel.png" /></div>
                </div>
            </div>
        </>
    )
}

export default TopBar