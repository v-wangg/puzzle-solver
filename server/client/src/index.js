import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want the app to work offline and load faster, change
// unregister() to register() below. Note this comes with some pitfalls.
// More about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
