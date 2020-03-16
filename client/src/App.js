import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layouts/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layouts/Landing';
import Alert from './components/layouts/Alert';
import { loadUser } from './actions/auth';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  // It is a replacement of 'componentDidMount' should run in event loop every time
  // The empty array refers to the conditions it should run - when empty, it is only once when the state changes
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
