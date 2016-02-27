import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'


window.React = React;

class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <h1>Search</h1>
                <Link to="/versus">Versus</Link>
            </div>
        )
    }
}

class Results extends React.Component {
    render() {
        return (
            <div className="results">
                <h1>Results</h1>
            </div>
        )
    }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Search}/>
    <Route path="/versus" component={Results}/>
  </Router>
), document.getElementById('main'))
