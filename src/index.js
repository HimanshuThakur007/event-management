// import React from 'react';
// import ReactDOM from 'react-dom';
// import AppRouter from './approuter';

// // import * as serviceWorker from './client/serviceWorker';

// ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// if (module.hot) { // enables hot module replacement if plugin is installed
//  module.hot.accept();
// }

import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './approuter';

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(<AppRouter />);

if (module.hot) {
  module.hot.accept();
}