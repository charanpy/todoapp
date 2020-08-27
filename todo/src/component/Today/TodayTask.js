import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getTodayTask } from '../../actions/category';
import Card from '../Main/Card';
import '../Main/Main.scss';
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom';
const TodayTask = ({ getTodayTask, task: { today } }) => {
            useEffect(() => {
                        getTodayTask()
            }, [getTodayTask])
            return (

                        <div>
                                    <Navbar />
                                    <div className="user-cate">
                                                TODAY TASKS
                                    </div>
                                    <div className='list'>
                                                {today && today.length > 0 ? today.map(cate => <Card key={cate._id} name={cate.name} id={cate._id} />) :
                                                            (<div className='no_cate'>
                                                                        <h4>NO TASKS CREATED</h4>
                                                                        <div style={{ textAlign: 'center' }}>
                                                                                    <Link to='/' className='link'>Go Back</Link></div>
                                                            </div>)}

                                    </div>
                        </div>
            )
}

TodayTask.propTypes = {
            getTodayTask: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
            task: state.category
})
export default connect(mapStateToProps, { getTodayTask })(TodayTask)
