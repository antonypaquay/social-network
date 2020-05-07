import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Explore from "./Explore";

const RouterApp = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/explore" component={Explore}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        </Router>
    )
}



ReactDOM.render(<RouterApp/> , document.getElementById('root'));

