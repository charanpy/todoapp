import React, { Fragment } from 'react'
import "./Home.scss";
import { Link } from 'react-router-dom'

import img from '../assests/clip-what-to-choose (1).png'
export const Home = () => {
            return (
                        <div className='cont'>
                                    <div className='container'>
                                                <div class="row">
                                                            <div className="col-md-5">
                                                                        <h1>Todo App</h1>
                                                                        <p>Plan your task and complete it!</p>

                                                                        <div className="buttons">
                                                                                    <Link to='/login' className='button b1'>Login</Link>
                                                                                    <Link to='/register' className='button b2'>Register</Link>
                                                                        </div>  </div>
                                                            <div className="col-md-6 ">
                                                                        <img src={img} alt="todo" className=' img-responsive' />
                                                            </div>
                                                </div>
                                    </div>
                        </div>
            )
}

export default Home;