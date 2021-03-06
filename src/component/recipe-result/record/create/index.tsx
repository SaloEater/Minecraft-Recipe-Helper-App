import React, {ChangeEvent} from "react";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import MachinesStore from "../../../../state/machine";
import ItemsStore from "../../../../state/item";
import RecipeResultsStore from "../../../../state/recipe-result";
import {RecipeResultEditForm} from "../../../../type/component/recipe-result/create";

class InnerRecipeResultNewRecord extends React.Component<RecipeResultEditForm, any> {

    MachinesStore: MachinesStore;
    ItemsStore: ItemsStore;
    RecipeResultsStore: RecipeResultsStore;

    constructor(props: any) {
        super(props);
        this.MachinesStore = props.MachinesStore;
        this.ItemsStore = props.ItemsStore;
        this.RecipeResultsStore = props.RecipeResultsStore;
        const rr = this.props.rr;
        if (rr) {
            this.RecipeResultsStore.onSelectResultItem(rr.resultItemId);
            this.RecipeResultsStore.onSelectMachine(rr.machineId);
            this.RecipeResultsStore.onAmountChange(String(rr.amount));
            this.RecipeResultsStore.onNewNameChange(rr.name);
        } else {
            this.RecipeResultsStore.onSelectResultItem("");
            this.RecipeResultsStore.onSelectMachine("");
            this.RecipeResultsStore.onAmountChange("");
            this.RecipeResultsStore.onNewNameChange("");
        }
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
                    placeholder="Name"
                    value={this.RecipeResultsStore.getNewName}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.RecipeResultsStore.onNewNameChange(e.target.value)}
                />
                <textarea
                    placeholder="Amount"
                    value={this.RecipeResultsStore.getAmount}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.RecipeResultsStore.onAmountChange(e.target.value)}
                />
                <button
                    onClick={() => this.props.onClick()}
                    disabled={this.RecipeResultsStore.canCreateNewItem}
                >Save</button>
            </div>
        );
    }
}

export const RecipeResultNewRecord = inject(
    "MachinesStore", "ItemsStore", "RecipeResultsStore"
)(observer(InnerRecipeResultNewRecord));