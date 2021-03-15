import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import About from './components/pages/About';
import Hospital from './components/pages/Hospital';
import Doctor from './components/pages/Doctor';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

import  HospitalState from './context/hospital/hospitalState';
import  DoctorState from './context/doctor/doctorState';
import  AuthState from './context/auth/authState';
import  AlertState from './context/alert/alertState';

import './App.css';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <HospitalState>
          <DoctorState>
            <Router>
              <Fragment>
                <Navbar />
               <section id="main-content">
                  <section className="wrapper site-min-height">
                    <Switch>
                      <PrivateRoute exact path='/' component={Hospital} />
                      <Route exact path='/' component={Hospital}/>
                      <Route exact path='/about' component={About}/>
                      <Route exact path='/hospital' component={Hospital}/>
                      <Route exact path='/doctor' component={Doctor}/>
                      <Route exact path='/login' component={Login} />
                      <Route exact path='/register' component={Register} />
                    </Switch>
                  </section>
                </section>
              </Fragment>
            </Router>
          </DoctorState>
        </HospitalState>
      </AlertState>
    </AuthState>
  );
}

export default App;
