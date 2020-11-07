import React, {ChangeEvent} from "react";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import ItemsStore from "../../../../state/item";
import RecipeResultsStore from "../../../../state/recipe-result";
import RecipesStore from "../../../../state/recipe";

class InnerRecipeNewRecord extends React.Component<any, any> {

    RecipesStore: RecipesStore;
    ItemsStore: ItemsStore;
    RecipeResultsStore: RecipeResultsStore;

    constructor(props: any) {
        super(props);
        this.RecipesStore = props.RecipesStore;
        this.ItemsStore = props.ItemsStore;
        this.RecipeResultsStore = props.RecipeResultsStore;
    }

    render() {
        const ItemSelection: any[] = [];
        this.ItemsStore.getItems().forEach(function (item) {
            ItemSelection.push(<option value={item.id}>{item.name}</option>);
        })
        const RecipeResultSelection: any[] = [];
        this.RecipeResultsStore.getRecipeResults().forEach((rr) => {
            RecipeResultSelection.push(<option value={rr.id}>{rr.name}</option>);
        })

        return (
            <div className={styles.items}>
                Describe the recipe:
                <select value={this.RecipesStore.getSelectedItemId} onChange={(e: ChangeEvent<HTMLSelectElement>) => this.RecipesStore.onSelectItem(e.target.value as string)}>
                    <option value="">Select item</option>
                    {ItemSelection}
                </select>
                <select value={this.RecipesStore.getSelectedRecipeResultId} onChange={(e: ChangeEvent<HTMLSelectElement>) => this.RecipesStore.onSelectRecipeResult(e.target.value as string)}>
                    <option value="">Select recipe result</option>
                    {RecipeResultSelection}
                </select>
                <textarea
                    placeholder="Amount"
                    value={this.RecipesStore.getAmount}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.RecipesStore.onAmountChange(e.target.value)}
                />
                <button
                    onClick={() => this.RecipesStore.createNewItemButtonClicked()}
                    disabled={this.RecipesStore.canCreateNewItem}
                >Save</button>
            </div>
        );
    }
}

export const RecipeNewRecord = inject(
    "RecipesStore", "ItemsStore", "RecipeResultsStore"
)(observer(InnerRecipeNewRecord));