import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom'

import LoginPage from './components/Login';
import SignupFormPage from './components/SignupFormPage';
import SplashPage from './components/SplashPage';
import HomeApp from './components/App';
import * as sessionActions from './store/session'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restore()).then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded  && (
    <Switch>
      <Route exact path='/'>
        <HomeApp />
      </Route>
      <Route path='/welcome'>
        <SplashPage />
      </Route>
      <Route path='/login'>
          <LoginPage page='login'/>
      </Route>
      <Route path ='/signup'>
          <LoginPage page='signup' />
      </Route>
    </Switch>
  );
}

export default App;
