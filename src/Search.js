import React from 'react';
import { connect } from 'react-redux';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: ""}
        this.titleChange = this.titleChange.bind(this);
        this.search = this.search.bind(this);
    }

    titleChange(event) {
        this.setState({title: event.target.value});
    }

    search(event) {
        event.preventDefault();
        this.props.onSearch(this.state.title);
    }

    render() {
        return <div><form onSubmit={this.search}>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" value={this.state.title} onChange={this.titleChange}/>
            <input type="submit" value="Search"/>
        </form>
        </div>;
    }
}

function Search({ onSearch, results = [] }) {
    return <div>
        <h1>Search</h1>
        <SearchForm onSearch={onSearch} />
        <div>
            {results.map(({Title,Poster,imdbID})=> <img src={Poster} alt={Title} key={imdbID} />)}
        </div>
    </div>;
}

export const ConnectedSearch = connect(
    function mapStateToProps(state) {
        return state.search;
    }, 
    function mapDispatchToProps(dispatch) {
        return {
            onSearch: (title)=> {
                dispatch({
                    type: 'SEARCH',
                    payload: fetch(`http://www.omdbapi.com/?apikey=8e4dcdac&s=${encodeURIComponent(title)}`)
                            .then((response) => response.json())
                  });
            }
        };
    }
)(Search);

export function searchReducer(state = {results: []}, action) {
    switch (action.type) {
        case "SEARCH_FULFILLED":
            return Object.assign(
                {}, 
                { results: action.payload.Response 
                        ? action.payload.Search.filter(({Poster}) => Poster !== "N/A") 
                        : []});
        default: return state;
    }
}