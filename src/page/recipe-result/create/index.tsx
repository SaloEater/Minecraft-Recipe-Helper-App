import React from "react";
import {RecipeResultNewRecord} from "../../../component/recipe-result/record/create";
import {inject} from "mobx-react";
import RecipeResultsStore from "../../../state/recipe-result";

@inject("RecipeResultsStore")
export default class RecipeResultCreatePage extends React.Component<any, any>
{
    RecipeResultsStore: RecipeResultsStore;

    constructor(props: any) {
        super(props);
        this.RecipeResultsStore = props.RecipeResultsStore;
    }

    render() {
        return (
            <RecipeResultNewRecord rr={null} onClick={this.RecipeResultsStore.createNewItemButtonClicked}/>
        );
    }
}