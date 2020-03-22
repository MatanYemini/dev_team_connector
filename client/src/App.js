import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import { loadUser } from './actions/auth';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import { saveState } from './localStorage';
var _ = require('lodash');

store.subscribe(
  _.throttle(() => {
    saveState(store.getState());
  }, 2000)
);

const App = () => {
  // It is a replacement of 'componentDidMount' should run in event loop every time
  // The empty array refers to the conditions it should run - when empty, it is only once when the state changes
  useEffect(() => {
    store.dispatch(loadUser());
    console.log('here app');
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
