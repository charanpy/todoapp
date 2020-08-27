import axios from "axios";
import { TODAY_CLEAR, CLEAR_CATEGORY, AUTH_SUCCESS, AUTH_ERROR, AUTHENTICATION_ERROR, CLEAR_ALERT, LOGIN_SUCCESS, LOGIN_ERROR, USER_LOADED, LOGOUT } from './type'
import setAuthToken from '../utils/setAuthToken'
export const loadUser = () => async dispatch => {
            if (localStorage.token) {
                        setAuthToken(localStorage.token)

            }
            try {
                        await axios.get('http://localhost:5000/api/me')
                                    .then(res => {
                                                dispatch({
                                                            type: USER_LOADED
                                                            , payload: res.data.user
                                                })
                                    })
                                    .catch(err => {
                                                console.log(err, err.response)
                                                dispatch({
                                                            type: AUTHENTICATION_ERROR
                                                })
                                    })

            } catch (err) {
                        console.log(err, err.response)
                        dispatch({
                                    type: AUTHENTICATION_ERROR
                        })
            }
}


export const register = ({ name, email, password }) => async dispatch => {

            const config = {
                        headers: {
                                    'Content-Type': 'application/json'
                        }
            }

            const body = JSON.stringify({ name, email, password })
            console.log(body)
            try {
                        axios.post('http://localhost:5000/api/auth/register', body, config)

                                    .then((res) => {
                                                console.log(res.data)
                                                dispatch({
                                                            type: AUTH_SUCCESS,

                                                })
                                    })
                                    .catch(e => {
                                                if (e) {
                                                            console.log(e.response)



                                                            dispatch({
                                                                        type: AUTH_ERROR,
                                                                        payload: { error: e.response.data.error }
                                                            })

                                                            setTimeout(() => {
                                                                        dispatch({
                                                                                    type: CLEAR_ALERT
                                                                        })
                                                            }, 5000)
                                                }
                                    })
            } catch (e) {
                        console.log(e)
                        dispatch({
                                    type: AUTH_ERROR,
                                    payload: { error: e.response.data.error }
                        })

                        setTimeout(() => {
                                    dispatch({
                                                type: CLEAR_ALERT
                                    })
                        }, 5000)
            }
}

export const login = (email, password) => async dispatch => {

            const config = {
                        headers: {
                                    'Content-Type': 'application/json'
                        }
            }

            const body = JSON.stringify({ email, password })
            console.log(body)
            try {
                        axios.post('http://localhost:5000/api/auth/login', body, config)
                                    .then(res => {
                                                console.log(res)
                                                if (!res.data.error) {
                                                            dispatch({
                                                                        type: LOGIN_SUCCESS,
                                                                        payload: res.data

                                                            })
                                                            dispatch(loadUser())
                                                }
                                    }).catch(e => {
                                                console.log(e.response)
                                                dispatch({
                                                            type: LOGIN_ERROR,
                                                            payload: { error: e.response.data.error }
                                                })

                                                setTimeout(() => {
                                                            dispatch({
                                                                        type: CLEAR_ALERT
                                                            })
                                                }, 1000)

                                    })


            } catch (e) {
                        console.log(e)

                        dispatch({
                                    type: LOGIN_ERROR,
                                    payload: { error: e.response.data.error }
                        })

                        setTimeout(() => {
                                    dispatch({
                                                type: CLEAR_ALERT
                                    })
                        }, 5000)
            }
}

export const logout = () => async dispatch => {
            dispatch({
                        type: CLEAR_CATEGORY
            })
            dispatch({
                        type: TODAY_CLEAR
            })
            dispatch({
                        type: LOGOUT
            })
}