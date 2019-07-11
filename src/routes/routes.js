import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from '../pages/main-page';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={MainPage}/>
            </Switch>
        </div>
    )
};

export default Routes;