import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import GameTab from './components/GameTab/GameTab';
import BoardGame from './containers/GameControl/Game';
import Login from './containers/Auth/Auth';
import Ranking from './containers/Ranking/Ranking';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Route, Switch,  BrowserRouter, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    return (
    	<BrowserRouter>
	      <div className="App">
	        <Layout> 
				<Switch>
					 <Route path="/login" component={Login} />
	         		 <Route path="/ranking" component={Ranking} />
	        		<Route path="/"  component={GameTab} />
	        		<Redirect to="/"/>
				</Switch>
	         
	         
	        </Layout>
	      </div>
      </BrowserRouter>
    );
  }
}

export default App;
