import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            search:""
        }
    }
    handleChange = (e)=>{
        this.setState({search:e.target.value})
    }
    render(){
        const {handleSearch} = this.props
        const {search} = this.state
        return(
            <div className="search-container">
                <input
                    value={search}
                    onChange={this.handleChange}
                    className="search-input" 
                    type="text"
                    placeholder="Search by Name"
                    />
                <Button variant="outline-info" onClick={()=>{handleSearch(search)}}>Search</Button>
            </div>
        )
    }
}

Search.propTypes={
    handleSearch:PropTypes.func.isRequired
}

export default Search