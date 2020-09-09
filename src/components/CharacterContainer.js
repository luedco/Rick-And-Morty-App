import React from 'react'
import Character from './Character'
import { getAlbumsByPopular, getCharacterByName, getCharactersById } from '../services/Character'
import Title from './Title'
import Search from './Search'
import Pagination from './Pagination'
import { number } from 'prop-types'
import Button from 'react-bootstrap/Button';

class CharacterContainer extends React.Component {
    constructor(props) {
        super(props)
        console.log("constructor")
        this.state = {
            characters: [],
            favCharacters: [],
            isFetch: true,
            pageNumber: 0,
            idFavs: " "
        }
    }
    //obteener de api


    async componentDidMount() {
        const responseJSON = await getAlbumsByPopular(this.state.pageNumber)
        this.setState(
            { characters: responseJSON.results, isFetch: false, }
        )
        
    }

    next = async (pageNumber) => {
        const responseJSON = await getAlbumsByPopular(pageNumber)
        this.setState(
            { characters: responseJSON.results, isFetch: false, pageNumber: pageNumber }

        )
    }

    favoriteFeature = (id) => {
        const newId = this.state.favCharacters.concat(id)

        if (this.state.favCharacters.length === 0) {
            console.log("empty! \n")
            this.setState({
                favCharacters: id
            })
        }
        if (this.state.favCharacters.length >= 5) {
            alert("Haz alcanzado tu limite de favoritos!")
        }
        if (!this.verificarRepetidos(id)) {
            this.setState({
                favCharacters: newId
            })
        }
        else {
            this.desFavorite(id)
        }


    }
    verificarRepetidos(id) {
        for (let i = 0; i <= this.state.favCharacters.length; i++) {
            if (this.state.favCharacters[i] === id) {
                return true
            }
        }
        return false
    }
    desFavorite(id) {
        for (let i = 0; i <= this.state.favCharacters.length; i++) {
            if (this.state.favCharacters[i] === id) {
                this.state.favCharacters.splice(i, 1);
                return true;
            }
        }
        return false
    }

    showFavorites = async () => {
        const listString = this.state.favCharacters.toString();
        const responseJSON = await getCharactersById(listString);
        if(listString === ""){
            alert("No tienes favoritos aún!")
        }else{
            this.setState({
                characters: responseJSON
            })
        }
    }
    handleSearch = async (search) => {
        const responseJSON = await getCharacterByName(search)
        this.setState({
            characters: responseJSON.results
        })

    }


    async paginate(pageNumber){
        //console.log("page number",pageNumber)

        let indexOfLastPost = pageNumber *10;
        let indexOfFirstPost = indexOfLastPost - 10;
        console.log(" page #",pageNumber,"chars",this.state.characters)
        alert("")
        /*const posts = this.state.characters
        
        const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);
        this.setState({
            characters: currentPosts,
            pageNumber: pageNumber
        })*/
    }
    componentDidUpdate() {

    }
    //render info
    render() {
        const { isFetch, characters, pageNumber } = this.state
        return (
            <React.Fragment>
                <Title>¡Rick And Morty!</Title>
                <Pagination paginate={this.next} />
                <Search handleSearch={this.handleSearch}></Search>
                <Button onClick={this.showFavorites} variant="outline-info">Favorites</Button>
                <section className="albums-container">
                    {
                        characters.map(
                            (character) =>
                                <p className="album-href">
                                    <Character
                                        imageurl={character.image}
                                        name={character["name"]}
                                        species={character["species"]}
                                        id={character.id}
                                        nep={character.episode}
                                        addFav={this.favoriteFeature}
                                    />
                                </p>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}

export default CharacterContainer