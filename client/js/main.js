import 'stylesheets/normalize'
import 'stylesheets/base'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import history from './utils/history'
import Routes from './routes'

ReactDOM.render((
  <Router history={history}>
    {Routes}
  </Router>
), document.getElementById('app'))
