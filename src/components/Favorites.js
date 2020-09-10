import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'


const Favorites = ({children})=> <Button showFavorites={children} variant="outline-info" className="fav-list-btn"> {children} </Button>



export default Favorites