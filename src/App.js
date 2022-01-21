import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage'
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';




function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" >
          <LandingPage />
        </Route>
      </Switch>
    </React.Fragment>

  );
}



export default App;
