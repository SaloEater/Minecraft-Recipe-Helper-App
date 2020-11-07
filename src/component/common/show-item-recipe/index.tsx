import React from "react";
import ItemsStore from "../../../state/item";
import styles from "./styles.module.css";
import RecipeResultsStore from "../../../state/recipe-result";
import {inject, observer} from "mobx-react";
import {ShowRecipeResult} from "../show-recipe-result";
import {ShowItemRecipeParams} from "../../../type/page/common/ShowItemRecipeParams";

class InnerShowItemRecipe extends React.Component<ShowItemRecipeParams, any>
{
    ItemsStore: ItemsStore;
    RecipeResultsStore: RecipeResultsStore;

    constructor(props: any) {
        super(props);
        this.ItemsStore = props.ItemsStore;
        this.RecipeResultsStore = props.RecipeResultsStore;
    }

    render() {
        const item = this.ItemsStore.getItem(this.props.itemId);
        const rrs: any[] = this.RecipeResultsStore
            .getRecipeResults()
            .filter((value) => value.resultItemId == item.id)
            .map((value) => <ShowRecipeResult recipeResultId={value.id} amount={Number(this.props.amount)}/>);
        return <div>
            To craft {this.props.amount} of {item.name} you need:
            <div className={styles.RecipeResult}>
                {rrs}
            </div>
        </div>;
    }
}

export const ShowItemRecipe = inject(
    "ItemsStore", "RecipeResultsStore"
)(observer(InnerShowItemRecipe));