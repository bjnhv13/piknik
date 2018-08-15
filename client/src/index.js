import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.js';



// ========================================

ReactDOM.render(
	<BrowserRouter>
		<App userId="123"/>
	</BrowserRouter>,
	document.getElementById('root')
);
