import { Dispatcher } from 'flux'
//import assign from 'react/lib/Object.assign';

// this is just an example of how you can extend a normal Dispatcher to do
// more work like debugging every dispatch call etc:

// let AppDispatcher = assign(new Dispatcher(), {
//   handleViewAction(action) {
//     //console.log('action:', action);
//     this.dispatch({
//       source: 'VIEW_ACTION',
//       action: action
//     });
//   }
// });
//export default AppDispatcher;

export default new Dispatcher()
