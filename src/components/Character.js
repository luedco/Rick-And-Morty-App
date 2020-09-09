import React from 'react'
import PropTypes from 'prop-types'


const Character = ({name,imageurl,species,addFav,id})=> (
    <div className="single-album">
        <div className="gallery">
            <img src={imageurl} alt={name}></img>
            <div className="des">
                <h2>{name}</h2>
                <p >{species}</p>
                <button onClick={() => addFav(id)} >Add Favorites</button>
            </div>
        </div>
    </div>
)

Character.propTypes = {
    name: PropTypes.string.isRequired,
    imageurl: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default Character;