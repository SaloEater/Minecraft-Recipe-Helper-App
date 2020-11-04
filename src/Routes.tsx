import React from "react";
import {Route, Router, Switch} from "react-router";
import {observer} from "mobx-react";
import MainLayout from "./layouts/main";
import MainPage from "./pages/main";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

@observer
export default class Routes extends React.Component<any, any> {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact><MainLayout><MainPage/></MainLayout></Route>
                    <Route path="/item/:id?" exact><MainLayout>"Items"</MainLayout></Route>
                    <Route path="/recipe/:id?" exact><MainLayout>"Recipes"</MainLayout></Route>
                    <Route path="/machine/:id?" exact><MainLayout>"Machines"</MainLayout></Route>
                    <Route path="/recipe-result/:id?" exact><MainLayout>"Recipe Results"</MainLayout></Route>
                </Switch>
            </Router>
        );
    }
}