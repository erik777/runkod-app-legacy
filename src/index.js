import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from './store';
import App from './containers';

import * as serviceWorker from './serviceWorker';

import './style/style.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App store={store}/>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);


/*
window.addEventListener("dragenter", function(e) {

    e.preventDefault();
    e.dataTransfer.effectAllowed = "none";
    e.dataTransfer.dropEffect = "none";

}, false);

window.addEventListener("dragover", function(e) {

    e.preventDefault();
    e.dataTransfer.effectAllowed = "none";
    e.dataTransfer.dropEffect = "none";

});

window.addEventListener("drop", function(e) {

    e.preventDefault();
    e.dataTransfer.effectAllowed = "none";
    e.dataTransfer.dropEffect = "none";

});
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
