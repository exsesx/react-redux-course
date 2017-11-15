import React, {Component} from 'react';
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TestComponent from 'components/TestComponent';
import store from 'store/index';
import 'styles/styles.scss'

window.store = store;

export default class App extends Component {
    render() {
        return (
            <Provider key={ module.hot ? Date.now() : store} store={store}>
                <MuiThemeProvider>
                    <TestComponent />
                </MuiThemeProvider>
            </Provider>
        )
    }
}

// redux -> material -> router