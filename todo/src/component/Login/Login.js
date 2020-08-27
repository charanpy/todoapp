import React, { Fragment, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import './Login.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ login, auth: { error, isAuthenticated } }) => {
            const [formData, setFormData] = useState({
                        email: '',
                        password: ''
            })
            const { email, password } = formData;
            const onHandleChange = (e) => {
                        setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value
                        })
                        console.log(email, password)
            }
            const onSubmit = e => {
                        e.preventDefault(e)
                        login(email, password)

            }
            const notify = (msg) => {
                        toast.configure()
                        toast.error(msg, {
                                    position: toast.POSITION.TOP_CENTER


                        });
            }
            return (
                        <>
                                    {isAuthenticated && (
                                                <Redirect to='/' />
                                    )}
                                    <Navbar />
                                    <form className='login' onSubmit={onSubmit}>
                                                <div className="wrapper">
                                                            <div className="icon">
                                                                        <h1><i className="fas fa-sign-in-alt"></i></h1>
                                                            </div>

                                                            {error !== undefined && error !== null && (<div style={
                                                                        {
                                                                                    fontFamily: "Open Sans",
                                                                                    fontSize: "1.4rem",
                                                                                    fontWeight: "400"
                                                                        }
                                                            }>
                                                                        { error.map(err => notify(err.error))}
                                                            </div>)}

                                                            <div className='input-form'>
                                                                        <span className="cred">Email</span>
                                                                        <input type='email' name='email' placeholder="Email"
                                                                                    required
                                                                                    onChange={onHandleChange}
                                                                                    autoFocus
                                                                        />
                                                            </div>

                                                            <div className='input-form'>
                                                                        <span className="cred">Password</span>
                                                                        <input type='password' name='password' placeholder="Password"
                                                                                    required
                                                                                    onChange={onHandleChange}
                                                                                    autoFocus />
                                                            </div>
                                                            <div class="button">
                                                                        <button>SIGNIN</button>
                                                            </div>
                                                </div>

                                    </form>
                        </>
            )
}
Login.propTypes = {
            login: PropTypes.func.isRequired,
            auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
            auth: state.auth
})
export default connect(mapStateToProps, { login })(Login);
