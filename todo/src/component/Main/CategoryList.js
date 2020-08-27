import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Main.scss';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Card from './Card'
import { getAllCategory, deleteCategory } from '../../actions/category'
import Navbar from '../Navbar/Navbar'
import Toaster from '../Toastify/Toaster';
const CategoryList = ({ category: { categories, deleted }, getAllCategory }) => {
            useEffect(() => {
                        getAllCategory()
            }, [getAllCategory])
            return (
                        <div>{deleted && <Toaster msg={true} name="Deleted successfully" />}
                                    <Navbar />
                                    <div className="user-cate">
                                                YOUR CATEGORIES
                                    </div>
                                    <div className='list'>
                                                {categories && categories.length > 0 ? categories.map(cate => <Card key={cate._id} name={cate.name} id={cate._id} />) :
                                                            (<div className='no_cate'>
                                                                        <h4>NO CATEGORIES FOUND</h4>
                                                                        <div style={{ textAlign: 'center' }}>
                                                                                    <Link to='/' className='link'>Go Back</Link></div>
                                                            </div>)}

                                    </div>

                        </div>
            )
}

CategoryList.propTypes = {
            category: PropTypes.object.isRequired,
            getAllCategory: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
            category: state.category
})
export default connect(mapStateToProps, { getAllCategory })(CategoryList)
