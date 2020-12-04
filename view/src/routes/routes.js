import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import DashBoard from "../components/Dashboard";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Auth from '../utils/Auth'
import WordsView from '../views/WordsView'


export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={WordsView}/>
            <RouteRegisteration path="/signin" component={SignIn} />
            <RouteRegisteration path="/signup" component={SignUp} />
            <RouteProtected path="/dashboard" component={DashBoard} />
        </Switch>
    );
}

const RouteRegisteration = ({ component: Component, ...rest }) => {
    const auth = React.useContext(Auth);
    return (
        <Route
            {...rest} render={props => !auth.auth ? <Component {...props} />: <Redirect to="/dashboard" /> } />
    );
}

const RouteProtected = ({ component: Component, ...rest }) => {
    const auth = React.useContext(Auth);
    console.log(auth.auth);
    return (
        <Route
        {...rest} render={props => auth.auth ? <Component {...props} />: <Redirect to="/signin" /> } />
    );
}