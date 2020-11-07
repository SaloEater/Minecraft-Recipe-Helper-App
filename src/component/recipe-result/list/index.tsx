import RecipeResultsStore from "../../../state/recipe-result";
import React from "react";
import {RecipeResult} from "../../../type/component/recipe-result";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";
import ItemsStore from "../../../state/item";
import MachinesStore from "../../../state/machine";

class InnerRecipeResultList extends React.Component<any, any>
{
    RecipeResultsStore: RecipeResultsStore;
    ItemsStore: ItemsStore;
    MachinesStore: MachinesStore;

    constructor(props: any) {
        super(props);
        this.RecipeResultsStore = props.RecipeResultsStore;
        this.ItemsStore = props.ItemsStore;
        this.MachinesStore = props.MachinesStore;
    }

    render() {
        const items: any[] = [];
        this.RecipeResultsStore.getRecipeResults().forEach(
            (rr: RecipeResult) => {
                const item = this.ItemsStore.getItem(rr.resultItemId);
                const machine = this.MachinesStore.getMachine(rr.machineId);
                return items.push(<div><Link to={"/recipe-result/"+rr.id}>{rr.name}</Link>: {item.name} using {machine.name} </div>);
            }
        );
        console.log(items);
        return (
            <div className={styles.items}>{items}</div>
        );
    }
}

export const RecipeResultList = inject(
    "RecipeResultsStore", "ItemsStore", "MachinesStore"
)(observer(InnerRecipeResultList));