import React, { useState } from 'react'
import './Todo.scss';
import { addTodos } from '../../actions/category';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const TodoInput = ({ id, addTodos }) => {
            const [getItem, setItem] = useState({
                        item: ''
            })
            const { item } = getItem;
            const onHandleChange = (e) => {
                        setItem({
                                    item: e.target.value
                        })
                        console.log(item)
            }
            const onSubmit = e => {
                        console.log("hi")
                        e.preventDefault();
                        addTodos(id, item)
                        setItem({
                                    item: ''
                        })
            }
            return (
                        <div class="todo">
                                    <div className='todo_box'>

                                                <h4>Todo Input</h4>
                                                <form onSubmit={onSubmit}>
                                                            <div className='input-form'>
                                                                        <input className='in' type='text' name="name" value={item} placeholder="Todo"
                                                                                    autoFocus
                                                                                    onChange={onHandleChange}
                                                                                    autoCapitalize
                                                                        />
                                                            </div>

                                                            <div className='button'>
                                                                        <button className='btn btn-primary'>CREATE</button>
                                                            </div>

                                                </form>

                                    </div>
                        </div>

            )
}
TodoInput.propTypes = {
            addTodos: PropTypes.func.isRequired
}
export default connect(null, { addTodos })(TodoInput);
