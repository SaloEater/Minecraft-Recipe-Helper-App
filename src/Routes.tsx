import React from "react";
import {Route, Switch} from "react-router";
import MainLayout from "./layout/main";
import MainPage from "./page/main";
import ItemPage from "./page/item";
import {ItemCreatePage} from "./page/item/create";
import MachinePage from "./page/machine";
import MachineCreatePage from "./page/machine/create";
import RecipeResultPage from "./page/recipe-result";
import RecipeResultCreatePage from "./page/recipe-result/create";
import RecipePage from "./page/recipe";
import RecipeCreatePage from "./page/recipe/create";
import ShowItemRecipePage from "./page/common/show-item-recipe";

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
                    <Route path="/recipe-result/create" exact component={RecipeResultCreatePage} />
                    <Route path="/recipe-result/:id?" exact component={RecipeResultPage}/>
                    <Route path="/recipe/create" exact component={RecipeCreatePage} />
                    <Route path="/recipe/:id?" exact component={RecipePage}/>
                    <Route path="/show-recipe/:itemId/:amount" exact component={ShowItemRecipePage} />
                </Switch>
            </MainLayout>
        );
    }
}