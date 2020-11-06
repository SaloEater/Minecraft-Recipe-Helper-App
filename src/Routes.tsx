import React from "react";
import {Route, Switch} from "react-router";
import {observer} from "mobx-react";
import MainLayout from "./layout/main";
import MainPage from "./page/main";
import ItemPage from "./page/item";
import ItemCreatePage from "./page/item/create";
import MachinePage from "./page/machine";
import MachineCreatePage from "./page/machine/create";

@observer
export default class Routes extends React.Component<any, any> {
    render() {
        return (
            <MainLayout>
                <Switch>
                    <Route path="/" exact render={() => (
                        <MainPage/>
                    )}/>
                    <Route path="/item/create" exact component={ItemCreatePage} />
                    <Route path="/item/:id?" exact component={ItemPage} />
                    <Route path="/machine/create" exact component={MachineCreatePage} />
                    <Route path="/machine/:id?" exact component={MachinePage}/>
                    <Route path="/recipe-result/:id?" exact render={() => (
                        "Recipe Results"
                    )}/>
                    <Route path="/recipe/:id?" exact render={() => (
                        "Recipes"
                    )}/>
                </Switch>
            </MainLayout>
        );
    }
}