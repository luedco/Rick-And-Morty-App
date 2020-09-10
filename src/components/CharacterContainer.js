import React from 'react'
import Character from './Character'
import { getAlbumsByPopular, getCharacterByName, getCharactersById } from '../services/Character'
import Title from './Title'
import Search from './Search'
import Pagination from './Pagination'
import { number } from 'prop-types'
import Button from 'react-bootstrap/Button';
import Favorites from './Favorites';
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
        this.forceUpdate();
        const newId = this.state.favCharacters.concat(id)
        //verificar si es repetido para ver si se agrega o se elimina de favoritos
        if ( !this.verificarRepetidos(id)) {
            //verificando que es el primero en la lista ? 
            if (this.state.favCharacters.length == null) {
                console.log("empty! \n")
                this.setState({
                    favCharacters: id
                })
                console.log("Lista cuando es cero",this.state.favCharacters)
            }else{
                if (this.state.favCharacters.length >= 5) {
                    alert("Haz alcanzado tu limite de favoritos!")
                    console.log("Lista limite",this.state.favCharacters)
                }else{
                    this.setState({
                        favCharacters: newId
                    })
                    console.log("Lista mayor cero ok",this.state.favCharacters)
                }
            }

        }
        else {
           /* this.desFavorite(id)
            console.log("Lista eliminar",this.state.favCharacters)*/
            for (let i = 0; i <= this.state.favCharacters.length; i++) {
                if (this.state.favCharacters[i] === id) {
                    this.state.favCharacters.splice(i, 1)
                   
                }
            }
        }
    }

    verificarRepetidos(id) {
        if(this.state.favCharacters.length === 0)
            return false
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
                this.state.favCharacters.splice(i, 1)
               
            }
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

    
    showFavorites = async () => {
        const listString = this.state.favCharacters.toString();
        const responseJSON = await getCharactersById(listString);

        if(listString === ""){
            alert("No tienes favoritos aún!")
            this.componentDidMount()
        }else{
            console.log("longitud", listString.length)
            if(listString.length === 1 ){
                this.setState({
                    characters: [responseJSON]
                })
            }else{
                this.setState({
                    characters: responseJSON
                })
            }
        }
    }

    //render info
    render() {
        const { isFetch, characters, pageNumber } = this.state
        return (
            <React.Fragment>
                <Title>¡Rick And Morty!</Title>
                <Pagination paginate={this.next} className="ls-pagination"/>
                <div className="search-fav">
                <Search handleSearch={this.handleSearch}></Search>
                <Button onClick={this.showFavorites} variant="outline-info" className="fav-list-btn"><a href="">Favorites</a></Button>
                </div>
                <section className="albums-container">
                    {
                        this.state.characters.map(
                            (character) =>
                                <p className="album-href">
                                    <Character
                                        imageurl={character.image}
                                        name={character["name"]}
                                        species={character["species"]}
                                        id={character.id}
                                        neps={character.episode}
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