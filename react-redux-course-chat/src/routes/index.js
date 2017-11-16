import {Route} from 'react-router-dom';

const routes = (
    <Route path="/" component={App}>
        <Route path="about" component={About} />
        <Route path="users" component={Users}>
            <Route path="/user/:userId" component={User} />
        </Route>
        <Route path="*" component={NoMatch} />
    </Route>
);

export default routes;