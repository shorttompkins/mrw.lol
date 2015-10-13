import React from 'react'
import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Routes from './routes'

React.render((
  <Router history={createBrowserHistory()}>
    {Routes}
  </Router>
), document.getElementById('app'))
