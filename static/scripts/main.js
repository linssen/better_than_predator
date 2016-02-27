import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import Search from './modules/Search'
import Results from './modules/Results'


window.React = React;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Search}/>
    <Route path="/versus" component={Results}/>
  </Router>
), document.getElementById('main'))
