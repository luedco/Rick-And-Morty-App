import React from 'react'
import PropTypes from 'prop-types'


const Title = ({children})=> <h1 className="title">{children}</h1>

Title.prototype={
    children: PropTypes.string.isRequired
}
export default Title