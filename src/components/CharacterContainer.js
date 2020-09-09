import React from 'react'
import Character from './Character'
import { getAlbumsByPopular, getCharacterByName, getCharacterById} from '../services/Character'
import Title from './Title'
import Search from './Search'
import Pagination from './Pagination'
import { number } from 'prop-types'

class CharacterContainer extends React.Component{
    constructor(props){
        super(props)
        console.log("constructor")
        this.state = {
            characters: [],
            favCharacters:[],
            isFetch:true,
            pageNumber:0,
            idFavs:" "
        }
    }
    //obteener de api


    async componentDidMount(){
        const responseJSON = await getAlbumsByPopular(this.state.pageNumber)
        this.setState(
            {characters: responseJSON.results, isFetch:false,}
            )
    }
    
    next = async (pageNumber) => {
        const responseJSON = await getAlbumsByPopular(pageNumber)
        this.setState(
            {characters: responseJSON.results, isFetch:false,pageNumber:pageNumber}
            
        )
    }

    nex2t = (id, idFav)=>{
        
        console.log("current"+id+ "old ids"+idFav)
    }

    showFavorites = ()=>{
        //mandar a llamar con url/${idFav}
        console.log("list"+this.state.idFavs)
    }
    handleSearch = async (search) => {
        const responseJSON = await getCharacterByName(search)
        this.setState({
            characters: responseJSON.results
        })
        
    }


    componentDidUpdate(){

    }
    //render info
    render(){
        const {isFetch, characters, pageNumber} = this.state
        let idFav ="gg";

        if(isFetch){
            return "Loading ..."
        }
        //const name = this.state.albums[0].title.label
        return (
            <React.Fragment>
                <Title>iTunes App</Title>
                <Pagination paginate={this.next}/>
                <Search handleSearch={this.handleSearch}></Search>
                <button onClick={this.showFavorites}>Favorites</button>
                <section className="albums-container">
                {
                    characters.map(
                    (character) => 
                        <p  className="album-href">
                            <Character 
                                imageurl={character.image} 
                                name={character["name"]}
                                species={character["species"]}
                                id={character.id}
                                addFav={this.nex2t}
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