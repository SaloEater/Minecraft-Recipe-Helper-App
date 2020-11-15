import React from "react";
import {inject} from "mobx-react";
import {RecipeResultParams} from "../../../type/page/recipe-result/RecipeResultParams";
import RecipeResultsStore from "../../../state/recipe-result";
import {RecipeResultNewRecord} from "./create";

@inject("RecipeResultsStore")
export default class RecipeResultRecord extends React.Component<RecipeResultParams, any>
{
    RecipeResultsStore: RecipeResultsStore;

    constructor(props: any) {
        super(props);
        this.RecipeResultsStore = props.RecipeResultsStore;
    }

    render() {
        const id = this.props.id;
        const rr = this.RecipeResultsStore.getRecipeResult(id);
        const onClick = () => {
            rr.amount = Number(this.RecipeResultsStore.getAmount);
            rr.machineId = this.RecipeResultsStore.getSelectedMachineId;
            rr.resultItemId = this.RecipeResultsStore.getSelectedResultItemId;
            rr.name = this.RecipeResultsStore.getNewName;
            this.RecipeResultsStore.save(rr);
        }
        return (
            <div>
                <RecipeResultNewRecord rr={rr} onClick={onClick}/>
            </div>
        );
    }
}