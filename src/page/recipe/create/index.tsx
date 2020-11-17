import React from "react";
import {RecipeNewRecord} from "../../../component/recipe/record/create";
import {inject} from "mobx-react";
import RecipesStore from "../../../state/recipe";

@inject ("RecipesStore")
export default class RecipeCreatePage extends React.Component<any, any>
{
    RecipesStore: RecipesStore;

    constructor(props: any) {
        super(props);
        this.RecipesStore = props.RecipesStore;
    }

    render() {
        return (
            <RecipeNewRecord recipe={null} onClick={() => this.RecipesStore.createNewItemButtonClicked()}/>
        );
    }
}