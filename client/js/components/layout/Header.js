import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import { Link } from 'react-router'
import history from '../../utils/history'
import Login from './Login'
import Logout from './Logout'
import UserStore from '../../stores/UserStore'

class Header extends Component {
  static propTypes = {
    userid: PropTypes.string
  }

  static getStores() {
    return [UserStore]
  }

  static getStateFromStores() {
    return { userid: UserStore.getUserid() }
  }

  tagSearch = () => {
    history.pushState(null, `/images/${this.refs.tag.value}`)
    this.refs.tag.value = ''
  }

  addImage = () => {
    history.pushState(null, '/image/add')
  }

  inputEnter = (event) => {
    if (event.key === 'Enter') {
      this.tagSearch()
    }
  }

  render() {
    return (
      <div className="page-header">
        <h1>
          <Link to="/">MRW.lol</Link>
        </h1>

        <div className="main-search">
          <div className="input-group">
            <input type="text" className="input" ref="tag" placeholder="Search..." onKeyPress={this.inputEnter} />
            <button type="button" className="button" onClick={this.tagSearch}>
              <i className="fa fa-search"></i>
            </button>
          </div>
          {(this.props.userid) ?
            <button type="button" onClick={this.addImage} className="button add-button"><i className="fa fa-plus"></i> Add Image</button>
            : (<div></div>)
          }
        </div>

        {(this.props.userid) ? <Logout /> : <Login />}
      </div>
    )
  }
}

export default connectToStores(Header)
