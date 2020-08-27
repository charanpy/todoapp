import {
            GET_CATEGORY, DELETE_CATEGORY, CATEGORY_SUCCESS, CLEAR_ALERT, CLEAR_CATEGORY, CLEAR_CREATE, TODO, ADD_TODO, DELETE_TODO
            , DELA_TODO, COMPLETED_TODO, UNCOMPLETED_TODO, TODAY_TASK, TODAY_CLEAR
} from '../actions/type'

const initialState = {
            cate: null,
            categories: [],
            created: false,
            deleted: false,
            todo: [],
            today: []
}

export default function (state = initialState, action) {
            const { type, payload } = action;

            switch (type) {
                        case CATEGORY_SUCCESS:
                                    return {
                                                ...state,
                                                created: true
                                    }
                        case CLEAR_CATEGORY:
                                    return {
                                                ...state,
                                                cate: null,
                                                categories: [],
                                                created: false,
                                                todo: []
                                    }
                        case GET_CATEGORY:
                                    return {
                                                ...state,
                                                categories: payload
                                    }
                        case DELETE_CATEGORY:
                                    return {
                                                ...state,
                                                categories: state.categories.filter(cate => cate._id !== payload),
                                                deleted: true
                                    }
                        case CLEAR_CREATE:
                                    return {
                                                ...state,
                                                created: false,
                                                deleted: false
                                    }
                        case TODO:
                                    return {
                                                ...state,
                                                todo: payload
                                    }
                        case ADD_TODO:
                                    return {
                                                ...state,
                                                todo: [...state.todo, payload]
                                    }
                        case DELETE_TODO:
                                    return {

                                                todo: []
                                    }
                        case DELA_TODO:
                                    return {
                                                ...state,
                                                todo: state.todo.filter(to => to._id !== payload)
                                    }
                        case COMPLETED_TODO:
                                    return {
                                                todo: state.todo.map(to => {
                                                            if (to._id !== payload) {
                                                                        return to
                                                            }
                                                            return { ...to, completed: true }
                                                })
                                    }
                        case UNCOMPLETED_TODO:
                                    return {
                                                todo: state.todo.map(to => {
                                                            if (to._id !== payload) {
                                                                        return to
                                                            }
                                                            return { ...to, completed: false }
                                                })
                                    }
                        case TODAY_TASK:
                                    return {
                                                ...state,
                                                today: payload
                                    }
                        case TODAY_CLEAR:
                                    return {
                                                ...state,
                                                today: []
                                    }
                        default:
                                    return state;
            }
}