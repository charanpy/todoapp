import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getTodo } from '../../actions/category'
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoComplete from './TodoComplete'
const TodoItem = ({ match, getTodo }) => {
            useEffect(() => {
                        getTodo(match.params.id)
            }, [getTodo])
            return (
                        <div>
                                    <Navbar />
                                    Hi
                                    <TodoInput id={match.params.id} />
                                    <TodoList id={match.params.id} />
                                    <TodoComplete id={match.params.id} />

                        </div>
            )
}

TodoItem.propTypes = {
            getTodo: PropTypes.func.isRequired
}

export default connect(null, { getTodo })(TodoItem)
