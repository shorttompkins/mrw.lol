import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppActions from './actions/Actions'
import App from './components/App'
import ImagesList from './components/images/ImagesList'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ImagesList} onEnter={()=>{AppActions.loadImages()}}/>
    <Route path="images/:tag" component={ImagesList} onEnter={(location) => {
      AppActions.loadImagesByTag(location.params.tag)
    }} />
  </Route>
)
