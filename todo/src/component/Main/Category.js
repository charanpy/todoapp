import React, { Fragment, useState } from 'react'
import './Main.scss';
import { connect } from 'react-redux';
import { createCategory } from '../../actions/category';
import PropTypes from 'prop-types';
const Category = ({ createCategory, history }) => {
            const [cate, setName] = useState({
                        name: ''
            })
            const { name } = cate;
            const handleChange = (e) => {
                        setName({

                                    [e.target.name]: e.target.value
                        })
            }
            const onSubmit = (e) => {
                        e.preventDefault();
                        createCategory(name, history)
            }
            return (
                        <div>
                                    <div class="category">
                                                <div className='category_box'>

                                                            <h4>Create a category</h4>
                                                            <form onSubmit={onSubmit}>
                                                                        <div className='input-form'>
                                                                                    <input type='text' name="name" value={name} placeholder="Ex:Office Work"
                                                                                                autoFocus
                                                                                                autoComplete='off'
                                                                                                autoCapitalize
                                                                                                onChange={handleChange} />
                                                                        </div>

                                                                        <div className='button'>
                                                                                    <button>CREATE</button>
                                                                        </div>

                                                            </form>

                                                </div>
                                    </div>

                        </div>
            )
}
Category.propTypes = {
            createCategory: PropTypes.func.isRequired
}
export default connect(null, { createCategory })(Category);
