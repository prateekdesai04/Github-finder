import React, { useReducer } from 'react';
import axios from 'axios'; // to avoid request from App.js
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;
//check if env is in production or not 

if(process.env.NODE_ENV != 'production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
else{
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {   // initial state
    const initialState = {
        users: [],
        user : {},
        repos : [],
        loading : false,
    }

    const [state, dispatch] =  useReducer(GithubReducer, initialState);

    // searchusers

    //search github users, make call to endpoint again whenever searched
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    
    dispatch({
        type: SEARCH_USERS,
        payload: res.data.items
    });
  };


    // getuser 

    // get a single Github user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    
    dispatch({
        type: GET_USER,
        payload: res.data
    });
  };


    // getrepos

    //get users repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({
        type: GET_REPOS,
        payload: res.data
    })
  };


    //clearuser

    //clear users from state
  const clearUsers = () => dispatch({type: CLEAR_USERS});

    ///setloading 
    const setLoading = () => dispatch({ type: SET_LOADING });


    // value is prop which is basically state variables which are to be made available to the entire project 
    return (
    <GithubContext.Provider 
        value = {{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }} 
    >
        {props.children}
    </GithubContext.Provider>
    );
};

export default GithubState;