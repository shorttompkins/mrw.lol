import React, { Component, PropTypes } from 'react'
import AppActions from '../../actions/actions'
import AppStore from '../../stores/store'
import Post from '../../components/posts/post'

export default class List extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor() {
    super()
    this._onChange = this._onChange.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange)
    AppActions.loadPost(this.props.params.postid)
    this.setState(this._getPost())

  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange)
  }

  _onChange() {
    this.setState(this._getPost(this.props.params.postid))
  }

  _getPost() {
    return { post: AppStore.getPost() }
  }

  render() {
    if (!this.state) { return null }

    return (
      <Post post={this.state.post} />
    )
  }
}
