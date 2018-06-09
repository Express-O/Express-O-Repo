import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'


ReactDOM.render(
  <Provider store={store}>
    <div style={{maxWidth: "1160px", margin: "0 auto"}}>
      <Router history={history}>
        <App />
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
)
