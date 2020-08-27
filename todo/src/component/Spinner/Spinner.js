import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'
export const Spinner = () => {
            return (
                        <Loader
                                    type="ThreeDots"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                    timeout={30000} //3 secs

                        />
            )
}
export default Spinner;