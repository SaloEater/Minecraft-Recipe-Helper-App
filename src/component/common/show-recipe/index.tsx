import {ShowRecipeParams} from "../../../type/page/common/ShowRecipeParams";
import React from "react";
import {inject, observer} from "mobx-react";
import RecipesStore from "../../../state/recipe";
import ItemsStore from "../../../state/item";
import styles from "./styles.module.css";
import {ShowItemRecipe} from "../show-item-recipe";

class InnerShowRecipe extends React.Component<ShowRecipeParams, any>
{
    RecipesStore: RecipesStore;
    ItemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.RecipesStore = props.RecipesStore;
        this.ItemsStore = props.ItemsStore;
    }

    render() {
        const recipe = this.RecipesStore.getRecipe(this.props.recipeId);
        const item = this.ItemsStore.getItem(recipe.itemId);
        const stacks = this.props.amount > item.stack ? Math.floor(this.props.amount/item.stack) : 0;
        const stacksString = stacks > 0 ? stacks + " stacks and" : "";
        const itemsAmount = stacks > 0 ? this.props.amount-stacks*item.stack : this.props.amount;
        return <div className={styles.Recipe}>
            {stacksString} {itemsAmount} of {item.name}
            <ShowItemRecipe itemId={item.id} amount={String(this.props.amount)}/>
        </div>;
    }
}

export const ShowRecipe = inject(
    "RecipesStore", "ItemsStore"
)(observer(InnerShowRecipe));
