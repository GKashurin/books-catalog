import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store/store";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import firebase from 'firebase';


const firebaseConfig = {
	apiKey: "AIzaSyAIBVCVvwWDdAMqtUPDN2oSJSJJI2R_pSU",
	authDomain: "books-catalog-bf375.firebaseapp.com",
	databaseURL: "https://books-catalog-bf375-default-rtdb.firebaseio.com",
	projectId: "books-catalog-bf375",
	storageBucket: "books-catalog-bf375.appspot.com",
	messagingSenderId: "387076517112",
	appId: "1:387076517112:web:67056530ae3e8520ec1f0d"
}

firebase.initializeApp(firebaseConfig);
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);


reportWebVitals();
