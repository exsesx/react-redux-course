import React from 'react';
import {render} from 'react-dom';
import App from 'containers/App';

import {AppContainer} from 'react-hot-loader';

const renderApp = Component => {
    render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('mount_place')
    )
};

renderApp(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('containers/App', () => {
        renderApp(App)
    })
}