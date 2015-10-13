import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Routes from './routes'

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    {Routes}
  </Router>
), document.getElementById('app'))
