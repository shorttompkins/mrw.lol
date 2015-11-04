import React, { Component } from 'react'
import { Link } from 'react-router'
import history from '../../utils/history'

class Header extends Component {
  tagSearch = () => {
    history.pushState(null, `/images/${this.refs.tag.value}`)
  }
  inputEnter = (event) => {
    if (event.key === 'Enter') {
      this.tagSearch()
    }
  }
  render() {
    return (
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h1>
                <Link to="/">MRW.lol</Link>
              </h1>
            </div>
            <div className="col-md-6">
              <div className="form-group main-search">
                <div className="input-group">
                  <input type="text" className="form-control" ref="tag" id="search" placeholder="Search..." onKeyPress={this.inputEnter} />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={this.tagSearch}><i className="fa fa-search"></i></button>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 main-login">
              Login | Register
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
