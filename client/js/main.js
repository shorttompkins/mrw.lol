import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import AppActions from './actions/actions'
import App from './routes/app'
import PostsList from './routes/posts/list'
import PostView from './routes/posts/view'

React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/apps/blog" component={App}>
      <IndexRoute component={PostsList} onEnter={AppActions.loadPosts()}/>
      <Route path="posts/:postid" component={PostView} onEnter={(location) => {AppActions.loadPost(location.params.postid)}} />
    </Route>
  </Router>
), document.getElementById('app'))
