import {
            AUTH_SUCCESS,
            AUTH_ERROR,
            AUTHENTICATION_ERROR,
            CLEAR_ALERT,
            LOGIN_SUCCESS,
            LOGIN_ERROR,
            USER_LOADED,
            LOGOUT
} from '../actions/type'
const initialState = {
            success: false,
            loading: true,
            error: [],
            user: null,
            token: null,
            isAuthenticated: false
}

export default function (state = initialState, action) {
            const { type, payload } = action;

            switch (type) {
                        case AUTH_SUCCESS:
                                    return {
                                                ...state,
                                                loading: false,
                                                success: true
                                    }
                        case AUTH_ERROR:
                                    return {
                                                ...state,
                                                loading: false,
                                                success: false,
                                                error: [payload]

                                    }
                        case CLEAR_ALERT:
                                    return {
                                                ...state,

                                                error: []

                                    }
                        case LOGIN_SUCCESS:
                                    localStorage.setItem("token", payload.token)
                                    return {
                                                ...state,
                                                loading: false,
                                                success: true,
                                                isAuthenticated: true,
                                                user: payload.user,
                                                error: []
                                    }
                        case LOGIN_ERROR:


                                    localStorage.removeItem("token")
                                    return {
                                                ...state,
                                                user: null,
                                                loading: false,
                                                error: [payload],
                                                isAuthenticated: false
                                    }
                        case AUTHENTICATION_ERROR:
                        case LOGOUT:
                                    localStorage.removeItem("token")
                                    return {
                                                ...state,
                                                loading: false,
                                                success: false,
                                                error: [],
                                                user: null,
                                                isAuthenticated: false
                                    }
                        case USER_LOADED:
                                    return {
                                                ...state,
                                                loading: false,
                                                isAuthenticated: true,
                                                user: payload,
                                                success: true

                                    }
                        default:
                                    return state
            }
}