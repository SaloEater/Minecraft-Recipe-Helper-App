import React from "react";
import {inject} from "mobx-react";
import ItemsStore from "../../../state/item";
import RecipeResultsStore from "../../../state/recipe-result";
import RecipesStore from "../../../state/recipe";
import {RecipeParams} from "../../../type/page/recipe/RecipeParams";

@inject("RecipesStore", "ItemsStore", "RecipeResultsStore")
export default class RecipeRecord extends React.Component<RecipeParams, any>
{
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
        const id = this.props.id;
        const recipe = this.RecipesStore.getRecipe(id);
        const item = this.ItemsStore.getItem(recipe.itemId);
        const rr = this.RecipeResultsStore.getRecipeResult(recipe.recipeResultId);
        const resultItem = this.ItemsStore.getItem(rr.resultItemId);
        return (
            <div>
                Create {rr.amount} of {resultItem.name} with {recipe.amount} of {item.name}
            </div>
        );
    }
}