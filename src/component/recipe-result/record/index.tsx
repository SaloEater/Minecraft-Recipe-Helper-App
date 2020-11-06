import React from "react";
import MachinesStore from "../../../state/machine";
import {inject} from "mobx-react";
import {Link} from "react-router-dom";
import {MachineParams} from "../../../type/page/machine/MachineParams";
import {RecipeResultParams} from "../../../type/page/recipe-result/RecipeResultParams";
import ItemsStore from "../../../state/item";
import RecipeResultsStore from "../../../state/recipe-result";

@inject("MachinesStore", "ItemsStore", "RecipeResultsStore")
export default class RecipeResultRecord extends React.Component<RecipeResultParams, any>
{
    MachinesStore: MachinesStore;
    ItemsStore: ItemsStore;
    RecipeResultsStore: RecipeResultsStore;

    constructor(props: any) {
        super(props);
        this.MachinesStore = props.MachinesStore;
        this.ItemsStore = props.ItemsStore;
        this.RecipeResultsStore = props.RecipeResultsStore;
    }

    render() {
        const id = this.props.id;
        const rr = this.RecipeResultsStore.getRecipeResult(id);
        const machine = this.MachinesStore.getMachine(rr.machineId);
        const item = this.ItemsStore.getItem(rr.resultId);
        return (
            <div>
                Create {rr.amount} of {item.name} using {machine.name}
            </div>
        );
    }
}