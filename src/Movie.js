import React from 'react';
import { connect } from 'react-redux';

function Movie(props) {
    return <div>
            { props.movie 
                ? <p>
                        <h1>{props.movie.Title}</h1>
                        <img src={props.movie.Poster} alt={`${props.movie.Title} poster`} />
                    </p>
                : <p>Loading...</p>
            }
            </div>;
}

const ConnectedMovie = connect(
    function mapStateToProps(state) {
        return state.movie;
    }, 
    function mapDispatchToProps(dispatch) {
        return {};
    }
)(Movie);

export const routeComponentMap = {
    MOVIE: ConnectedMovie
};

const defaultState = {movie: null};

export const movieReducer = {
    movie: function (state = defaultState, action) {
        switch (action.type) {
            case "MOVIE_CLEAR": 
                return Object.assign({}, state, defaultState);
            case "MOVIE_FETCHED":
                return Object.assign({}, state, {movie: action.movie});
            default: return state;
        }
    }
};

export const movieRouteConfig = {
    path: '/movie/:imdbID',
    thunk: async (dispatch, getState) => {
        dispatch({ type: "MOVIE_CLEAR"});
        const imdbID = getState().location.payload.imdbID;
        const movie = await fetch(`http://www.omdbapi.com/?apikey=8e4dcdac&i=${imdbID}`)
        .then((response) => response.json());
        dispatch({ type: "MOVIE_FETCHED", movie });
    }
};

