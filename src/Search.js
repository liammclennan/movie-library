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
        return <form onSubmit={this.search}>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" value={this.state.title} onChange={this.titleChange}/>
        </form>;
    }
}

function Search() {
    return <div>
        <h1>Search</h1>
        <SearchForm />
    </div>;
}

export const ConnectedSearch = connect(
    function mapStateToProps(state) {
        return state;
    }, 
    function mapDispatchToProps(dispatch) {
        return {
            onSearch: (title)=> { dispatch({type: "SEARCH", title}); }
        };
    }
)(Search);

export function searchReducer(state = {}, action) {
    return state;
}