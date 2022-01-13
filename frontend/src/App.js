import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'

import LoginPage from './components/Login';
import SignupFormPage from './components/SignupFormPage';
import SplashPage from './components/SplashPage';
import HomeApp from './components/App';
import HomeHeader from './components/App/Header';
import AddPhoto from './components/App/AddPhoto';
import AddAlbum from './components/App/AddAlbum';
import PhotoDetail from './components/App/SingleImage';
import EditPhoto from './components/App/EditPhoto';
import EditAlbum from './components/App/EditAlbum';
import ViewAlbum from './components/App/ViewAlbum';
import Footer from './components/Footer';
import * as sessionActions from './store/session'
import { getUserAlbums } from '../src/store/album'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const albums = useSelector(state => state.albumState.entries)
  let id;

  useEffect(() => {
    dispatch(sessionActions.restore()).then(() => setIsLoaded(true))
  }, [dispatch])

  if(sessionUser) {
    id = sessionUser.id
  }

  useEffect(() => {
    dispatch(getUserAlbums(id))
  }, [sessionUser])



  if(!sessionUser) return (
    <Switch>
      <Route exact path='/'>
        <SplashPage />
      </Route>
      <Route path='/login'>
          <LoginPage page='login'/>
      </Route>
      <Route path ='/signup'>
          <LoginPage page='signup' />
      </Route>
      <Route>
        <p className='nope'>Nope. There's nothing here.</p>
      </Route>
    </Switch>
  )

  return isLoaded  && (
    <>
      <HomeHeader />
        <Switch>
          <Route exact path='/'>
            <HomeApp way={'explore'}/>
          </Route>
          <Route path='/hellmo'>
            <h1>Hellmo</h1>
          </Route>
          <Route path='/photostream'>
            <HomeApp way={'photostream'} />
          </Route>
          <Route exact path='/albums'>
            <HomeApp way={'albums'} />
          </Route>
          <Route path='/albums/add'>
            <AddAlbum />
          </Route>
          <Route exact path='/albums/:id'>
            <ViewAlbum />
          </Route>
          <Route exact path='/albums/:id/edit'>
              <EditAlbum albums={albums}/>
          </Route>
          <Route path='/login'>
            <Redirect to='/' />
          </Route>
          <Route path='/signup'>
            <Redirect to='/' />
          </Route>
          <Route path='/upload'>
            <AddPhoto albums={albums}/>
          </Route>
          <Route exact path='/photos/:id'>
            <PhotoDetail />
          </Route>
          <Route exact path='/photos/:id/edit'>
            <EditPhoto albums={albums}/>
          </Route>
          <Route>
            <p className='nope'>Nope. There's nothing here.</p>
          </Route>


        </Switch>
      <Footer />
    </>
  );
}

export default App;
