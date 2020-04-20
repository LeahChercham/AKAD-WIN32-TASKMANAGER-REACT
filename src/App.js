import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css';
import Axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import consts from '../src/consts'
const CREATE_ROUTE = consts.CREATE_ROUTE

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

  //* Lifecycle Method */
  componentDidMount() {
    let login
    if (localStorage.login) { // If the user did already connect through that browser, make him logged in automatically
      login = JSON.parse(localStorage.login)
    } else {
      login = { ...this.state.login } // Keep the state as it is
    }
    this.setState({ login }) // Update the state
  }

  logIn = async (username, password) => {
    if (!password) { alert("Please enter your password.") }

    let response = await Axios.get(CREATE_ROUTE(`login/${username}/${password}`)) // asynchronous function
    if (response.data.allowLogin) {
      let login = { isLoggedIn: true, user: response.data.user }
      localStorage.login = JSON.stringify(login)
      this.setState({ login: login })
    } else {
      alert("Wrong password or username.")
    }
  }

  logOut = () => {
    localStorage.clear()
    let login = { user: {}, isLoggedIn: false }
    this.setState({ login })
  }

  display = () => {
    let display
    this.state.login.isLoggedIn ?
      display = <Dashboard login={this.state.login} logOut={this.logOut} /> :
      display = <Home logIn={this.logIn} />
    return display
  }


  render() {
    return (
      <Router>

        <Route path="/" exact render={() => this.display()} />

      </Router>
    )
  }
}

export default App;
