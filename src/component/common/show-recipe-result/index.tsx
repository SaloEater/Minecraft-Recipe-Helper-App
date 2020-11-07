import React from "react";
import {inject, observer} from "mobx-react";
import ItemsStore from "../../../state/item";
import RecipeResultsStore from "../../../state/recipe-result";
import RecipesStore from "../../../state/recipe";
import {ShowRecipe} from "../show-recipe";
import {ShowRecipeResultParams} from "../../../type/page/common/ShowRecipeResultParams";
import styles from "./styles.module.css";

class InnerShowRecipeResult extends React.Component<ShowRecipeResultParams, any>
{
    ItemsStore: ItemsStore;
    RecipeResultsStore: RecipeResultsStore;
    RecipesStore: RecipesStore;

    constructor(props: any) {
        super(props);
        this.ItemsStore = props.ItemsStore;
        this.RecipeResultsStore = props.RecipeResultsStore;
        this.RecipesStore = props.RecipesStore;
    }

    render() {
        const rr = this.RecipeResultsStore.getRecipeResult(this.props.recipeResultId);
        const actualAmount = Math.ceil(this.props.amount/rr.amount);
        const recipes = this.RecipesStore
            .getRecipes()
                .filter((value) => value.recipeResultId == rr.id)
                .map((value) => <ShowRecipe recipeId={value.id} amount={Math.ceil(actualAmount*value.amount)}/>);
        return <div className={styles.RecipeResult}>
            To craft {actualAmount} of {rr.name} you need
            {recipes}
        </div>;
    }
}

export const ShowRecipeResult = inject(
    "ItemsStore", "RecipeResultsStore", "RecipesStore"
)(observer(InnerShowRecipeResult));