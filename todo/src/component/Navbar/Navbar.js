import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';
import "./Navbar.scss";
import { logout } from '../../actions/auth'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const currentTab = (history, path) => {

            if (history.location.pathname === path) {

                        return {

                                    color: '#FF4848'
                        }

            }

            else {

                        return {
                                    color: '#212529'
                        }
            }
}

export const Navbar = ({ history, logout, auth: { isAuthenticated } }) => {



            return (

                        <div className="header">
                                    <h1><Link to='/' className='todo-head'>TODO</Link></h1>

                                    <div className='options'>
                                                <Link style={currentTab(history, '/home')} className='option' to='/home'>
                                                            HOME
                                     </Link>
                                                {isAuthenticated ? (<>
                                                            <Link style={currentTab(history, '/today')} className='option' to='/today'>
                                                                        TODAY'S TASK
                                     </Link>
                                                            <Link style={currentTab(history, '/category')} className='option' to='/category'>
                                                                        CATEGORY
                                     </Link>
                                                            <Link style={{ color: 'crimson' }} className='option' to='/login' onClick={logout}>
                                                                        SIGNOUT
                                                </Link>
                                                </>) : (
                                                                        <>
                                                                                    <Link style={currentTab(history, '/login')} className='option' to='/login'>
                                                                                                SIGNIN
                                   </Link>



                                                                                    <Link className='option' style={currentTab(history, '/register')} to='/register'>SIGN UP</Link>
                                                                        </>)}

                                                <li><i className="fas fa-hamburger"></i></li>
                                    </div>
                                    <li><i className="fas fa-hamburger"></i></li>
                        </div>

            )
}
Navbar.propTypes = {
            logout: PropTypes.func.isRequired,
            auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
            auth: state.auth
})
export default connect(mapStateToProps, { logout })(withRouter(Navbar));