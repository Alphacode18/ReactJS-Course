import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from '../types';
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: '',
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();
    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENTSECRET}`);
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items,
    });
  };

  const clearUsers = () =>
    dispatch({
      type: CLEAR_USERS,
    });

  const getUser = async (username) => {
    setLoading();
    const response = await axios.get(`https://api.github.com/users/${username}?&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENTSECRET}`);
    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };

  const getUsersRepos = async (username) => {
    setLoading();
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENTSECRET}`);
    dispatch({
      type: GET_REPOS,
      payload: response.data,
    });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUsersRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
