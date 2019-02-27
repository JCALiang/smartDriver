import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import GameTab from './components/GameTab/GameTab';
import Login from './containers/Auth/Auth';
import Register from './components/Login/Register'
import Ranking from './containers/Ranking/Ranking';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Route, Switch,  BrowserRouter} from 'react-router-dom';


import Game from './containers/GameControl/Game'

class App extends Component {
  render() {
    return (
    	<BrowserRouter>
	      <div className="App">
	        <Layout> 
				<Switch>
					 <Route path="/login" component={Login} />
					 <Route path="/register"  component={Register} />
	         		 <Route path="/ranking" component={Ranking} />
	        		<Route path="/"   component={Game} />
				</Switch>
	        </Layout>
	      </div>
      </BrowserRouter>
    );
  }
}

export default App;
