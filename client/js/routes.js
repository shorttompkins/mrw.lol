import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppActions from './actions/Actions'
import App from './components/App'
import ImagesList from './components/images/ImagesList'
import Image from './components/images/Image'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ImagesList} onEnter={()=>{AppActions.loadImages()}}/>
    <Route path="images/:tag" component={ImagesList} onEnter={(location) => {
      AppActions.loadImagesByTag(location.params.tag)
    }} />
    <Route path="image/:id" component={Image} onEnter={(location) => {
      AppActions.loadImageByFilename(location.params.id)
    }} />
  </Route>
)
