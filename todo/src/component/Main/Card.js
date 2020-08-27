import React from 'react'
import './Main.scss';
import { connect } from 'react-redux';
import { deleteCategory } from '../../actions/category';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
const Card = ({ name, id, deleteCategory }) => {
            return (


                        <div className='card'>
                                    <div className='card-title'>
                                                <h3>{name}</h3>
                                    </div>
                                    <div className='card-button'>
                                                <Link to={`/category/${id}`} className='li'>VIEW</Link>
                                    </div>
                                    <div class="icon">
                                                <h2 onClick={() => deleteCategory(id)}> <i className='fas fa-trash-alt i1'></i>
                                                </h2><i className='fas fa-star i2'></i>
                                    </div>
                        </div>

            )
}
Card.propTypes = {
            deleteCategory: PropTypes.func.isRequired
}
export default connect(null, { deleteCategory })(Card);