import React, { Component } from 'react'
import { Link } from 'react-router'

class Header extends Component {
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
                  <input type="text" className="form-control" id="search" placeholder="Search..." />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
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
