import React from 'react'
import { Link } from 'react-router'

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Lets Shop</h1>
        <Link to="/apps/myapp/cart/">View Shopping Cart</Link>
      </div>
    )
  }
}

export default Header
