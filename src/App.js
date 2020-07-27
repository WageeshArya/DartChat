import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WeatherState from './context/DartChatState';
import Login from './components/login/Login'
import Signup from './components/signup/Signup';
import Dashboard from './components/dashboard/Dashboard';

require('dotenv').config();
const firebase = require("firebase");

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

function App() {
  return (
    <WeatherState>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </WeatherState>
  );
}

export default App;
