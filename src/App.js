import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css';
import Axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

class App extends Component {
  constructor() {
    super()
    this.state = {
      login: {
        isLoggedIn: false,
        user: {}
      }
    }
  }

  componentDidMount(){
    let login
    if(localStorage.login){
      login = JSON.parse(localStorage.login)
    } else {
      login = this.state.login
    }
    this.setState({login})
  }

  logIn = async (username, password) => {
    let response = await Axios.get(`http://localhost:4000/login/${username}/${password}`)
      if (response.data.allowLogin) {
        let login = { isLoggedIn: true, user: response.data.user }
        localStorage.login = JSON.stringify(login)
        this.setState({ login: login })
      } else {
        alert("wrong password or username")
      }
  }

  logOut = () => {
    localStorage.clear()
    let login = {user: {}, isLoggedIn: false}
    this.setState({login})
  }

  display = () => {
    let display
    this.state.login.isLoggedIn ?
      display = <Dashboard login={this.state.login} logOut={this.logOut}/> :
      display = <Home logIn={this.logIn} />
    return display
  }


  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact render={() => this.display()} />
        </div>
      </Router>
    )
  }
}

export default App;
