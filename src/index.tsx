import 'normalize.css';
import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-fira-sans';
import 'typeface-merriweather';
import 'typeface-playfair-display';
import App from './App';
import './App.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
