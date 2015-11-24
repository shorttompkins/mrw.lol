import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppActions from './actions/Actions'
import App from './components/App'
import ImagesList from './components/images/ImagesList'
import Image from './components/images/Image'
import AddImage from './components/images/AddImage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ImagesList} onEnter={()=>{
      AppActions.loadImages()
      AppActions.loadTags()
    }}/>
    <Route path="images/:tag" component={ImagesList} onEnter={(location) => {
      AppActions.loadImagesByTag(location.params.tag)
    }} />
    <Route path="image/add" component={AddImage} onEnter={() => {
      AppActions.resetImage()
    }}/>
    <Route path="image/add/:id" component={AddImage} onEnter={(location) => {
      AppActions.loadImageByUniqueId(location.params.id)
    }} />
    <Route path="image/:id" component={Image} onEnter={(location) => {
      AppActions.loadImageByUniqueId(location.params.id)
    }} />
  </Route>
)
