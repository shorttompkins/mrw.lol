import React from 'react'
import AddToCart from './addtocart'
import AppStore from '../../stores/store'

class Catalog extends React.Component {
  constructor() {
    super()
    this.state = this._getCatalog()
  }

  render() {
    let items = this.state.items.map(function(item){
      return (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>${item.cost}</td>
          <td><AddToCart item={item} /></td>
        </tr>
      )
    })

    return (
      <table width="100%">
        {items}
      </table>
    )
  }

  _getCatalog() {
    return { items: AppStore.getCatalog() }
  }
}

export default Catalog
