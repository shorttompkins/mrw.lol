import React, { Component } from 'react'
import AppActions from '../../actions/actions'
import AppStore from '../../stores/store'
import PostsList from '../../components/posts/list'

// let loader = {
//   active: {
//     display: 'block'
//   },
//   inactive: {
//     display: 'none'
//   }
// }

export default class List extends Component {
  constructor() {
    super()
    this.state = this._getPosts()
    this._onChange = this._onChange.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange)

    if (!this.state.posts.length) {
      AppActions.loadPosts()
    }
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange)
  }

  _onChange() {
    this.setState(this._getPosts())
  }

  _getPosts() {
    return { posts: AppStore.getPosts() }
  }

  render() {
    return (
      <PostsList posts={this.state.posts} />
    )
  }
}
