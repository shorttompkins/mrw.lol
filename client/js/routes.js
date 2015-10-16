import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppActions from './actions/Actions'
import App from './components/App'
import PostsList from './components/posts/PostsList'
import Post from './components/posts/Post'

export default (
  <Route path="/apps/blog/" component={App}>
    <IndexRoute component={PostsList} onEnter={()=>{AppActions.loadPosts()}}/>
    <Route path="posts/:postid" component={Post} onEnter={(location) => {
      AppActions.loadPost(location.params.postid)
      AppActions.loadPostComments(location.params.postid)
    }} />
  </Route>
)
