/* eslint-disable react/no-unknown-property */
import './TopBar.scss'
import { Link } from 'react-router-dom'
import { ImSearch } from 'react-icons/im'
import { FiArrowDownCircle } from 'react-icons/fi'
import { useEffect, useState } from 'react'

function TopBar() {

    const [selectedCollection, setSelectedCollection] = useState("Sofa")
    const [selectListOpen, setSelectListOpen] = useState(false)
    const [storyIndex, setStoryIndex] = useState(null)
    const [courseCounter, setCourseCounter] = useState(0)

    useEffect(() => {
        if (storyIndex) {
            setTimeout(() => {
                setStoryIndex(null)
            }, 5000);
        }

    }, [storyIndex]

    )
    useEffect(() => {
        let interval = setInterval(() => {
            setCourseCounter(pre => pre + 1)
        }, 10)
        if (courseCounter === 150) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [courseCounter])

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
                            <li className='filter-item' onClick={() => { setSelectedCollection("Sofa"); setSelectListOpen(false) }}>Sofa</li>
                            <li className='filter-item' onClick={() => { setSelectedCollection("Lamp"); setSelectListOpen(false) }}>Lamp</li>
                            <li className='filter-item' onClick={() => { setSelectedCollection("TV"); setSelectListOpen(false) }}>TV</li>
                            <li className='filter-item' onClick={() => { setSelectedCollection("Kitchen"); setSelectListOpen(false) }}>Kitchen</li>
                        </ul>
                    </div>
                    <span className="search-btn"><ImSearch /></span>
                </div>

                <div className="stories_container">
                    <div className='text-yellow-500 font-extrabold '>
                        <h2>{courseCounter}</h2>

                    </div>
                    <div className={`story_item ${storyIndex === 1 && "select"}`} onClick={() => setStoryIndex(1)}>
                        <img src="/general_images/story/elon.png" />
                        <svg style={{ "enableBackground": "new -580 439 577.9 194" }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </div>
                    <div className={`story_item ${storyIndex === 2 && "select"}`} onClick={() => setStoryIndex(2)}>
                        <img src="/general_images/story/pavel.png" />
                        <svg style={{ "enableBackground": "new -580 439 577.9 194" }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </div>
                    <div className={`story_item ${storyIndex === 3 && "select"}`} onClick={() => setStoryIndex(3)}>
                        <img src="/general_images/story/elon.png" />
                        <svg style={{ "enableBackground": "new -580 439 577.9 194" }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </div>
                    <div className={`story_item ${storyIndex === 4 && "select"}`} onClick={() => setStoryIndex(4)}>
                        <img src="/general_images/story/pavel.png" />
                        <svg style={{ "enableBackground": "new -580 439 577.9 194" }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar