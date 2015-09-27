import React from 'react'
import AppStore from '../../stores/store'
import RemoveFromCart from './removefromcart'
import IncreaseItem from './increaseitem'
import DecreaseItem from './decreaseitem'
import { Link } from 'react-router'

function cartItems() {
  return { items: AppStore.getCart() }
}

class Cart extends React.Component {
  constructor() {
    super()
    this.state = cartItems()
    AppStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange)
  }

  _onChange = () => {
    this.setState(cartItems())
  }

  render() {
    let total = 0
    let items = this.state.items.map((item, i) => {
      let subtotal = item.cost * item.qty

      total += subtotal
      return (
        <tr key={item.id}>
          <td><RemoveFromCart index={i} /></td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>
            <IncreaseItem index={i} />
            <DecreaseItem index={i} />
          </td>
          <td>${subtotal}</td>
        </tr>
      )
    })

    return (
      <div>
        <table width="100%">
        <tbody>
          {items}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" align="right">Total</td>
            <td align="right"><strong>${total}</strong></td>
          </tr>
        </tfoot>
        </table>
        <Link to="/apps/myapp/">Continue Shopping</Link>
      </div>
    )
  }
}

export default Cart
