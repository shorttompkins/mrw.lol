import React, { Component } from 'react'
import { Link } from 'react-router'
import history from '../../utils/history'

class Header extends Component {
  tagSearch = () => {
    history.pushState(null, `/images/${this.refs.tag.value}`)
    this.refs.tag.value = ''
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
        </div>

        <div className="login-links">
          Login | Register
        </div>
      </div>
    )
  }
}

export default Header
