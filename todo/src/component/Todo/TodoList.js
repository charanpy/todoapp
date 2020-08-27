import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Todo.scss';
import './Input.scss';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { deleteTodo, completedTodo } from '../../actions/category.js'
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Toastify/Toaster.scss';


const TodoList = ({ todos: { todo }, id, deleteTodo, completedTodo }) => {

            function notify() {

                        toast.info("Task completed 🎉", {

                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,


                        });
            }




            return (
                        <div class="todo list">

                                    <ToastContainer />
                                    <div className='todo_box todo_reverse'>
                                                {todo && todo.length > 0 && todo.map((to) => (
                                                            !to.completed ? (

                                                                        <div class="todo_list">

                                                                                    <p><input type="checkbox" id="todo" onClick={() => {
                                                                                                completedTodo(id, to._id)

                                                                                                notify()
                                                                                    }} name="todo" value="todo" />
                                                                                                <label for="todo" data-content={to.item}>{to.item}</label>
                                                                                    </p><i className='fas fa-trash-alt tras' onClick={() => {

                                                                                                deleteTodo(id, to._id)

                                                                                    }} /> </div>
                                                            ) : ''
                                                ))}




                                    </div>
                        </div>
            )
}

TodoList.propTypes = {
            todos: PropTypes.object.isRequired,
            deleteTodo: PropTypes.func.isRequired,
            completedTodo: PropTypes.func.isRequired
}
const mapStateToPrps = state => ({
            todos: state.category
})
export default connect(mapStateToPrps, { deleteTodo, completedTodo })(TodoList)
