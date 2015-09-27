import { Route, DefaultRoute } from 'react-router'
import App from './components/app'
import Catalog from './components/catalog/catalog'
import Cart from './components/cart/cart'

export default (
  <Route name="app" path="/apps/myapp/" handler={App}>
    <Route name="cart" path="cart/" handler={Cart}/>
    <DefaultRoute handler={Catalog} />
  </Route>
)
