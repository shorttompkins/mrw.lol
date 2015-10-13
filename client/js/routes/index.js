import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppActions from '../actions/actions'
import App from '../components/App'
import ViewPostsList from './ViewPostsList'
import ViewPost from './ViewPost'

export default (
  <Route path="/apps/blog/" component={App}>
    <IndexRoute component={ViewPostsList} onEnter={()=>{AppActions.loadPosts()}}/>
    <Route path="posts/:postid" component={ViewPost} onEnter={(location) => {AppActions.loadPost(location.params.postid)}} />
  </Route>
)
