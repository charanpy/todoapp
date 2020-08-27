import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import './Main.scss'
const Welcome = ({ auth: { user } }) => {

            return (
                        <div>
                                    <div class="username">
                                                <h1>Welcome {user && user.name} </h1>
                                    </div>
                        </div>
            )
}

Welcome.propTypes = {
            auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
            auth: state.auth
})
export default connect(mapStateToProps)(Welcome)
