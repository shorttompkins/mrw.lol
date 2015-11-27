import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { ImageActions, TagActions, UserActions } from './actions'
import App from './components/App'
import ImagesList from './components/images/ImagesList'
import Image from './components/images/Image'
import AddImage from './components/images/AddImage'

export default (
  <Route path="/" component={App} onEnter={() => {
    if (window.userid) {
      UserActions.getUserById(window.userid)
    }
  }}>
    <IndexRoute component={ImagesList} onEnter={()=>{
      ImageActions.loadImages()
      TagActions.loadTags()
    }}/>
    <Route path="users/:userid" component={ImagesList} onEnter={(location) => {
      ImageActions.loadImagesByUserId(location.params.userid)
      TagActions.loadTagsByUserId(location.params.userid)
    }} />
    <Route path="images/:tag" component={ImagesList} onEnter={(location) => {
      ImageActions.loadImagesByTag(location.params.tag)
    }} />
    <Route path="users/:userid/:tag" component={ImagesList} onEnter={(location) => {
      ImageActions.loadImagesByUserIdTag(location.params.userid, location.params.tag)
    }} />
    <Route path="image/add" component={AddImage} onEnter={() => {
      ImageActions.resetImage()
    }}/>
    <Route path="image/add/:id" component={AddImage} onEnter={(location) => {
      ImageActions.loadImageByUniqueId(location.params.id)
    }} />
    <Route path="image/:id" component={Image} onEnter={(location) => {
      ImageActions.loadImageByUniqueId(location.params.id)
      // if logged in, load users TAGS
      if (window.userid) {
        TagActions.loadImageUserTags(location.params.id, window.userid)
      }
    }} />
  </Route>
)
