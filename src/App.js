import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css';
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

  display = () => {
    let display
    this.state.login.isLoggedIn ?
      display = <div>Logged In</div>:
      display = <Home/>
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
