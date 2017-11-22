import React, { Component } from 'react';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'containers/App';
import store from 'store/index';
import 'styles/styles.scss'

window.store = store;

export default class Root extends Component {
    render() {
        return (
            <Provider key={module.hot ? Date.now() : store} store={store}>
                <MuiThemeProvider>
                    <Router>
                        <App/>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

// redux -> material -> router