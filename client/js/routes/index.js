import React from 'react'
import { Route, DefaultRoute } from 'react-router'
import App from './app'
import PostsList from '../routes/posts/list'
import PostView from '../routes/posts/view'

export default (
  <Route name="app" path="/apps/blog/" handler={App}>
    <Route name="post" path="posts/:postid" handler={PostView}/>
    <DefaultRoute handler={PostsList} />
  </Route>
)
