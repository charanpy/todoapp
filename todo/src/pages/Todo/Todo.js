import React, { Fragment, useEffect } from 'react'
import Navbar from '../../component/Navbar/Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Welcome from '../../component/Main/Welcome'
import Category from '../../component/Main/Category'
import { getAllCategory } from '../../actions/category';
import PropTypes from 'prop-types';
import Toaster from '../../component/Toastify/Toaster';
import Card from '../../component/Main/Card'
export const Todo = ({ getAllCategory, category: { created } }) => {


            return (
                        <div>
                                    <Navbar />
                                    { created && (<Redirect to='/category' />)}
                                    <Welcome />
                                    <Category />


                        </div>
            )
}
Todo.propTypes = {
            getAllCategory: PropTypes.func.isRequired,
            category: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
            category: state.category
})
export default connect(mapStateToProps, { getAllCategory })(Todo);
