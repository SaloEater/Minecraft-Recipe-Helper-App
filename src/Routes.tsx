import React from "react";
import {Route, Switch} from "react-router";
import {observer} from "mobx-react";
import MainLayout from "./layout/main";
import MainPage from "./page/main";
import ItemPage from "./page/item";
import CreatePage from "./page/item/create";

@observer
export default class Routes extends React.Component<any, any> {
    render() {
        return (
            <MainLayout>
                <Switch>
                    <Route path="/" exact render={() => (
                        <MainPage/>
                    )}/>
                    <Route path="/item/create" exact component={CreatePage} />
                    <Route path="/item/:id?" exact component={ItemPage} />
                    <Route path="/recipe/:id?" exact render={() => (
                        "Recipes"
                    )}/>
                    <Route path="/machine/:id?" exact render={() => (
                        "Machines"
                    )}/>
                    <Route path="/recipe-result/:id?" exact render={() => (
                        "Recipe Results"
                    )}/>
                </Switch>
            </MainLayout>
        );
    }
}