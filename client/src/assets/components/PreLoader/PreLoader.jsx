/* eslint-disable react/prop-types */
import { Hourglass, RotatingSquare } from 'react-loader-spinner'
import './PreLoader.css'

function PreLoader({ type }) {
    return (
        <div className="LoaderWrapper">
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
            <h3 className='loader-title'>Please wait ...</h3>
        </div>
    )
}

export default PreLoader