import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { completedTodo } from '../../actions/category'
import './complete.css';
import './Todo.scss';
import './Input.scss';

const TodoComplete = ({ todos: { todo }, id, completedTodo }) => {
            const [showButton, setShowButton] = useState(true);
            const [showMessage, setShowMessage] = useState(false);
            return (
                        <div>
                                    <Container className='conta'>
                                                {showButton && (
                                                            <Button
                                                                        onClick={() => setShowMessage(true)}
                                                                        size="lg"
                                                                        style={{
                                                                                    fontFamily: 'Open Sans Condensed', fontSize: '1.8rem', textTransform: 'uppercase', position: 'absolute', right: '2rem'
                                                                        }}
                                                            >
                                                                        Completed
                                                            </Button>
                                                )
                                                }
                                                <CSSTransition
                                                            in={showMessage}
                                                            timeout={300}
                                                            classNames="alert"
                                                            unmountOnExit
                                                            onEnter={() => setShowButton(false)}
                                                            onExited={() => setShowButton(true)}
                                                >
                                                            <Alert className='aler'
                                                                        variant="primary"
                                                                        dismissible
                                                                        onClose={() => setShowMessage(false)}
                                                            >
                                                                        <Alert.Heading style={{ margin: '2rem 0', textAlign: 'center', fontSize: '3rem', fontFamily: 'Open Sans' }}>
                                                                                    Completed Todo
          </Alert.Heading>
                                                                        <div className='todo_box todo_reverse'>
                                                                                    {todo && todo.length > 0 && todo.map((to) => (
                                                                                                to.completed ? (

                                                                                                            <div class="todo_list">

                                                                                                                        <p>
                                                                                                                                    <label for="todo" data-content={to.item}>{to.item}</label>
                                                                                                                        </p><span onClick={() => {
                                                                                                                                    completedTodo(id, to._id)
                                                                                                                        }}><i className='fas fa-minus-circle tras minu' ></i> </span></div>
                                                                                                ) : ' '
                                                                                    ))}




                                                                        </div>

                                                                        <Button className='closebtn' onClick={() => setShowMessage(false)} style={{
                                                                                    fontFamily: 'Open Sans Condensed', fontSize: '1.8rem', textTransform: 'uppercase',
                                                                                    margin: '2rem'
                                                                        }}>
                                                                                    Close
          </Button>
                                                            </Alert>
                                                </CSSTransition>
                                    </Container >
                        </div>
            );
}
TodoComplete.propTypes = {
            todos: PropTypes.object.isRequired,
            completedTodo: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
            todos: state.category
})

export default connect(mapStateToProps, { completedTodo })(TodoComplete)
