import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import User from './components/users/User';
import About from './components/pages/About';
import axios from 'axios';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const getUser = async (username) => {
    setLoading(true);
    const response = await axios.get(`https://api.github.com/users/${username}?&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENTSECRET}`);
    setUser(response.data);
    setLoading(false);
  };

  const getUsersRepos = async (username) => {
    setLoading(true);
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENTSECRET}`);
    setRepos(response.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  return (
    <GithubState>
      <Router>
        <div className='app'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUsersRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
