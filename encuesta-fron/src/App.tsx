import React, { useEffect } from 'react';
import './App.css';
import Card from'./components/card'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from "react-router-dom";
import useMyUserStore from './zustand/user-store'
const [useStore] = useMyUserStore;

export default () => {
  const getUser = useStore(state=>state.getUser)
  const Auth = useStore(state=>state.isAuth)
  useEffect(()=>{
          (async function x(){
              await getUser()
          })()
  },[])
  return (
    <Router>
    <Switch>
        <Route path="/login">
          <Card />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
