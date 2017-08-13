import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from './components/Board';
require('./index.scss');

ReactDOM.render(
	<Board />, 
	document.getElementById('app'));