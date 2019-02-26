import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//react dnd 
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//redux
import {createStore} from 'redux';
//import thunk from 'react-thunk';
import reducer from './store/reducers'
import {Provider} from 'react-redux'
const store= createStore(reducer);



const app= (
	<DragDropContextProvider backend={HTML5Backend}>
	<App />
	</DragDropContextProvider>)


ReactDOM.render(<Provider store={store}> {app} </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
