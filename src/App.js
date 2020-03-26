import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css';
import Axios from 'axios';
import Home from './components/Home';

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


  logIn = (username, password) => {
    Axios.get(`http://localhost:4000/login/${username}/${password}`).then((response) => {
      if (response.data.allowLogin) {
        let login = { isLoggedIn: true, user: response.data.user }
        this.setState({ login: login })
        localStorage.login = JSON.stringify(login)
      } else {
        alert("wrong password or username")
      }
    })
  }

  display = () => {
    let display
    this.state.login.isLoggedIn ?
      display = <div>Logged In</div> :
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
