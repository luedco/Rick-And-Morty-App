import { func } from "prop-types"

const baseurl='https://rickandmortyapi.com/api/character'

export async function getAlbumsByPopular(pageNumber){
    console.log("service"+pageNumber)
    pageNumber = pageNumber
    const response = await fetch(`${baseurl}/?page=${pageNumber}`)
    const responseJSON = await  response.json()
    return responseJSON
}

export async function getCharacterByName(name){
    const response = await fetch(`${baseurl}/?name=${name}`)
    const responseJSON = await response.json()
    return responseJSON
}

//cambiar a obtener varios
export async function getCharactersById(listId){
    const response = await fetch(`${baseurl}/${listId}`)
    const responseJSON = await response.json()
    return responseJSON
}

export default {
    getAlbumsByPopular
}