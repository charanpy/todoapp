import axios from 'axios';
import {
            GET_CATEGORY, DELETE_CATEGORY, CATEGORY_SUCCESS, CLEAR_CREATE, TODO, ADD_TODO,
            DELETE_TODO, DELA_TODO, COMPLETED_TODO, UNCOMPLETED_TODO, TODAY_TASK
} from './type';


export const createCategory = (name, history) => async dispatch => {

            const config = {
                        headers: {
                                    'Content-Type': 'application/json'
                        }
            }

            const body = JSON.stringify({ name })
            console.log(body)
            try {
                        axios.post('http://localhost:5000/api/category', body, config)
                                    .then(res => {
                                                dispatch({
                                                            type: CATEGORY_SUCCESS
                                                })


                                                // setTimeout(() => {
                                                //             dispatch({
                                                //                         type: CLEAR_CREATE
                                                //             })
                                                // }, 1000)


                                    }).catch(e => {
                                                console.log(e.response)


                                    })


            } catch (e) {
                        console.log(e)


            }

}


export const getAllCategory = () => async dispatch => {

            dispatch({
                        type: DELETE_TODO
            })
            try {
                        axios.get('http://localhost:5000/api/category')
                                    .then(res => {
                                                console.log(res.data)

                                                dispatch({
                                                            type: GET_CATEGORY,
                                                            payload: res.data

                                                })
                                    }).catch(e => {
                                                console.log(e.response)


                                    })


            } catch (e) {
                        console.log(e)


            }

}


export const deleteCategory = (id) => async dispatch => {


            try {
                        axios.delete(`http://localhost:5000/api/category/${id}`,)
                                    .then(res => {
                                                dispatch({
                                                            type: DELETE_CATEGORY,
                                                            payload: id
                                                })
                                                setTimeout(() => {
                                                            dispatch({
                                                                        type: CLEAR_CREATE
                                                            })
                                                }, 1000)


                                    }).catch(e => {
                                                console.log(e.response)


                                    })


            } catch (e) {
                        console.log(e)


            }

}

export const getTodo = (id) => async dispatch => {


            try {
                        axios.get(`http://localhost:5000/api/category/${id}`)
                                    .then(res => {
                                                console.log(res.data)

                                                dispatch({
                                                            type: TODO,
                                                            payload: res.data.todos

                                                })
                                    }).catch(e => {
                                                console.log(e.response)


                                    })


            } catch (e) {
                        console.log(e)


            }

}
//add todos
export const addTodos = (id, item) => async dispatch => {
            const config = {
                        headers: {
                                    'Content-Type': 'application/json'
                        }
            }
            console.log(item)
            const body = JSON.stringify({ item })
            console.log(body)
            try {
                        axios.post(`http://localhost:5000/api/todo/${id}`, body, config)
                                    .then(res => {
                                                console.log(res.data.send)
                                                dispatch({
                                                            type: ADD_TODO,
                                                            payload: res.data.send[res.data.send.length - 1]
                                                })
                                    }).catch(e => {
                                                console.log(e.response.data, e)


                                    })


            } catch (e) {
                        console.log(e)


            }
}

//delete todo


export const deleteTodo = (cateid, todoid) => async dispatch => {


            try {
                        axios.delete(`http://localhost:5000/api/todo/${cateid}/${todoid}`,)
                                    .then(res => {
                                                dispatch({
                                                            type: DELA_TODO,
                                                            payload: todoid
                                                })



                                    }).catch(e => {
                                                console.log(e.response)


                                    })


            } catch (e) {
                        console.log(e)


            }

}


//completed todo
export const completedTodo = (cateid, todoid) => async dispatch => {


            try {
                        axios.put(`http://localhost:5000/api/todo/${cateid}/${todoid}`,)
                                    .then(res => {
                                                console.log(res.data.send.completed)
                                                if (!res.data.send.completed) {
                                                            return dispatch({
                                                                        type: UNCOMPLETED_TODO,
                                                                        payload: todoid
                                                            })
                                                }
                                                else {
                                                            return dispatch({
                                                                        type: COMPLETED_TODO,
                                                                        payload: todoid
                                                            })
                                                }



                                    }).catch(e => {
                                                console.log(e.response)


                                    })


            } catch (e) {
                        console.log(e)


            }

}


//get today task


export const getTodayTask = () => async dispatch => {


            try {
                        axios.get(`http://localhost:5000/api/todo/today`)
                                    .then(res => {
                                                console.log(res.data)

                                                dispatch({
                                                            type: TODAY_TASK,
                                                            payload: res.data.cateIndex

                                                })
                                    }).catch(e => {
                                                console.log(e.response)


                                    })


            } catch (e) {
                        console.log(e)


            }

}