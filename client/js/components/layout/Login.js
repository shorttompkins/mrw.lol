import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super()
    this.state = { popup: false }
  }
  showPopup = () => {
    this.setState({ popup: true })
  }
  hidePopup = () => {
    this.setState({ popup: false })
  }
  render() {
    let class_names = ['login-popup']
    class_names.push((this.state.popup) ? 'show' : 'hide')

    return (
      <div className="login-links">
        <a onClick={this.showPopup}>Login | Register</a>

        <div className={class_names.join(' ')}>
          <p>Easily login using any of the social networks below...</p>

          <a href="/auth/twitter" className="button twitter float-left"><i className="fa fa-twitter"></i>Login with Twitter</a>
          <a href="/auth/facebook" className="button facebook"><i className="fa fa-facebook"></i>Login with Facebook</a>
          <a href="/auth/google" className="button google float-left"><i className="fa fa-google"></i>Login with Google</a>
          <a href="/auth/github" className="button github"><i className="fa fa-github"></i>Login with GitHub</a>

          <a onClick={this.hidePopup} className="close fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-close fa-stack-1x fa-inverse"></i>
          </a>
        </div>
      </div>
    )
  }
}

export default Login
