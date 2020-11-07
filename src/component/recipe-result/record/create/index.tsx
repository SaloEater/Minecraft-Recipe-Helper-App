import React, {ChangeEvent, SelectHTMLAttributes} from "react";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import MachinesStore from "../../../../state/machine";
import ItemsStore from "../../../../state/item";
import RecipeResultsStore from "../../../../state/recipe-result";

class InnerRecipeResultNewRecord extends React.Component<any, any> {

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
        const ItemSelection: any[] = [];
        this.ItemsStore.getItems().forEach(function (item) {
            ItemSelection.push(<option value={item.id}>{item.name}</option>);
        })
        const MachineSelection: any[] = [];
        this.MachinesStore.getMachines().forEach(function (machine) {
            MachineSelection.push(<option value={machine.id}>{machine.name}</option>);
        })

        return (
            <div className={styles.items}>
                Describe the machine:
                <select value={this.RecipeResultsStore.getSelectedResultItemId} onChange={(e: ChangeEvent<HTMLSelectElement>) => this.RecipeResultsStore.onSelectResultItem(e.target.value as string)}>
                    <option value="">Select item</option>
                    {ItemSelection}
                </select>
                <select value={this.RecipeResultsStore.getSelectedMachineId} onChange={(e: ChangeEvent<HTMLSelectElement>) => this.RecipeResultsStore.onSelectMachine(e.target.value as string)}>
                    <option value="">Select machine</option>
                    {MachineSelection}
                </select>
                <textarea
                    value={this.RecipeResultsStore.getAmount}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.RecipeResultsStore.onAmountChange(e.target.value)}
                />
                <button
                    onClick={() => this.RecipeResultsStore.createNewItemButtonClicked()}
                    disabled={this.RecipeResultsStore.canCreateNewItem}
                >Save</button>
            </div>
        );
    }
}

export const RecipeResultNewRecord = inject(
    "MachinesStore", "ItemsStore", "RecipeResultsStore"
)(observer(InnerRecipeResultNewRecord));