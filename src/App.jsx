/* eslint-disable */
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLoader from './components/helpers/MainLoader'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorUI from './components/layouts/globals/ErrorUI'
import ReactGA from 'react-ga'

//context api states

const Home = React.lazy(() => import('./components/pages/Home'));

const NotFound = React.lazy(() => import('./components/pages/404'));
// const NetworkUi = React.lazy(() => import('./components/pages/NetworkUI'));


// Dashbaord




const App = () => {

  const TRACKING_ID = "UA-184506492-1";

  ReactGA.pageview(window.location.pathname + window.location.search);


  ReactGA.initialize(TRACKING_ID);

  const errorHandler = (err, info) => {

    console.log(err, 'logged error');
    console.log(info, 'logged error info');

  }
  
  return(

    <Router>


            <Suspense fallback={MainLoader.MainLoader()}>

              <ErrorBoundary fallback={ErrorUI()} onError={errorHandler} >

                <Switch>
                <Route exact path="/" component={Home} />
     
                  <Route exact path="*" component={NotFound} />
                </Switch>

              </ErrorBoundary>

            </Suspense>

                    

    </Router>
    
  )
}

export default App;