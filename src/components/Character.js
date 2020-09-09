import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';

const Character = ({name,imageurl,species,neps,addFav,id})=> (
    <div className="single-album">
        <div className="gallery">
            <img src={imageurl} alt={name}></img>
            <div className="des">
                <h3>{name}</h3>
                <p >Species: {species} / Episodes: {neps.length}</p>
                <Button variant="outline-info" onClick={() => addFav(id)}>Favorite</Button>
            </div>
        </div>
    </div>
)

Character.propTypes = {
    name: PropTypes.string.isRequired,
    imageurl: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    neps: PropTypes.number
}

export default Character;