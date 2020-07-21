import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false
  }

  searchUsers = async text => {
    this.setState({ loading: true });
    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENTSECRET}`);
    this.setState( {users: response.data.items, loading: false});
  }

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div className="app">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={ users.length > 0 ? true : false }/>
          <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  }
}

export default App;
