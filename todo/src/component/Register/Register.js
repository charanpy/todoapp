import React, { Fragment, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import '../Login/Login.scss';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
export const Register = ({ register, auth: { success, error, isAuthenticated } }) => {
            const [formData, setFormData] = useState({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
            })

            const { name, email, password, confirmPassword } = formData;

            const onHandleChange = (e) => {
                        setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value
                        })
            }

            const notify = (msg) => {
                        toast.configure()
                        toast.error(msg, {
                                    position: toast.POSITION.TOP_CENTER


                        });
            }
            const onSubmit = e => {
                        e.preventDefault();
                        console.log(formData);
                        if (password !== confirmPassword) {
                                    console.log(true)
                                    return notify("Passwords does not match")

                        }
                        else {
                                    register({ name, email, password })
                                    setFormData({
                                                ...formData,
                                                email: '',
                                                name: '',
                                                password: '',
                                                confirmPassword: ''
                                    })
                        }
            }
            const registerSuccess = () => (
                        <p style={
                                    {
                                                fontFamily: 'Open Sans Condensed',
                                                fontWeight: "500",
                                                color: "#fff",
                                                fontSize: "1.5rem",
                                                padding: "2rem",
                                                textAlign: "center",
                                                background: "green"
                                    }
                        }>Account Created.<Link to='/login'>SIGNIN</Link></p>
            )

            return (
                        <>
                                    {isAuthenticated && (
                                                <Redirect to='/' />
                                    )}
                                    <Navbar />
                                    <form className='login' onSubmit={onSubmit}>


                                                <div className="wrapper">
                                                            <div className="icon">
                                                                        <h1><i className="fas fa-user"></i></h1>
                                                            </div>
                                                            {success && (

                                                                        registerSuccess()
                                                            )

                                                            }

                                                            {error ? (<div style={
                                                                        {
                                                                                    fontFamily: "Open Sans",
                                                                                    fontSize: "1.4rem",
                                                                                    fontWeight: "400"
                                                                        }
                                                            }>
                                                                        { error.map(err => notify(err.error))}
                                                            </div>) : ''}
                                                            <div className='input-form'>
                                                                        <span className="cred">Name</span>
                                                                        <input type='text' name='name' placeholder="Username"
                                                                                    required
                                                                                    autoFocus
                                                                                    value={name}
                                                                                    onChange={e => onHandleChange(e)}
                                                                        />
                                                            </div>

                                                            <div className='input-form'>
                                                                        <span className="cred">Email</span>
                                                                        <input type='email' name='email' placeholder="Email"
                                                                                    required
                                                                                    autoFocus
                                                                                    value={email}
                                                                                    onChange={e => onHandleChange(e)}
                                                                        />
                                                            </div>

                                                            <div className='input-form'>
                                                                        <span className="cred">Password</span>
                                                                        <input type='password' name='password' placeholder="Password"
                                                                                    required

                                                                                    value={password}
                                                                                    onChange={e => onHandleChange(e)}
                                                                        />
                                                            </div>

                                                            <div className='input-form'>
                                                                        <span className="cred">Confirm Password</span>
                                                                        <input type='password' name='confirmPassword' placeholder="Password"
                                                                                    required

                                                                                    value={confirmPassword}
                                                                                    onChange={e => onHandleChange(e)}
                                                                        />
                                                            </div>

                                                            <div class="button">
                                                                        <button>SIGNUP</button>
                                                            </div>

                                                </div>
                                    </form>
                        </>
            )
}
Register.propTypes = {
            register: PropTypes.func.isRequired,
            auth: PropTypes.object.isRequired

}
const mapStateToProps = state => ({
            auth: state.auth
})
export default connect(mapStateToProps, { register })(Register);
