/* eslint-disable react/prop-types */
import { Hourglass, RotatingSquare, Comment } from 'react-loader-spinner'
import './PreLoader.css'

function PreLoader({ type }) {
    return (
        <div className={`LoaderWrapper ${type==="comment" && "pin-to-top"}`}>
            {type === undefined &&
                <Hourglass
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#6499E9', '#2E4374']}
                />
            }
            {
                type === "RotatingSquare" &&
                <RotatingSquare
                    height="200"
                    width="200"
                    color="#0802A3"
                    ariaLabel="rotating-square-loading"
                    strokeWidth="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            }
            {
                type === "comment" &&
                <Comment
                    visible={true}
                    height="300"
                    width="300"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    color="#fff"
                    backgroundColor="#06a99d"
                />
            }
            <h3 className='loader-title'>Please wait ...</h3>
        </div>
    )
}

export default PreLoader