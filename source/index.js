
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import style from'./styles/styles.css';
import Link from 'react-router/lib/Link';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';
import IndexRoute from 'react-router/lib/IndexRoute';
import Router from 'react-router/lib/Router';

import YoutubeHome from './views/YoutubeHome';
import VimeoHome from './views/VimeoHome';
import SoundcloudHome from './views/SoundcloudHome';

import hashHistory from 'react-router/lib/hashHistory';
import { syncHistoryWithStore } from 'react-router-redux';

let initState={};
let store=createStore(rootReducer, initState, applyMiddleware(thunk));

 if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
      const nextRootReducer = require('./reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
let history = syncHistoryWithStore(hashHistory, store);


const NoMatch = () => (<div className="text-center">
  <h3 className="text-danger">404: Page not found!</h3>
  <Link to="/youtube">Back To Home</Link>
</div>);

render(
   <Provider store={store}>
     <Router history={history}>
	     <Redirect from="/" to="youtube" />
	     <Route path="youtube" component={YoutubeHome} />
	     <Route path="vimeo" component={VimeoHome} />
	     <Route path="soundcloud" component={SoundcloudHome} />
	     <Route path="*" component={NoMatch} />
     </Router>
   </Provider>
  ,
  document.querySelector('#root')
);
