import React from 'react'
import Router from 'react-router'
import routes from './routes'

window.React = React

Router.run(routes, Router.HistoryLocation, function(Root, state){
  React.render(<Root {...state}/>, document.getElementById('app'))
})
