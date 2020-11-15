import React from "react";
import {inject} from "mobx-react";
import RecipesStore from "../../../state/recipe";
import {RecipeParams} from "../../../type/page/recipe/RecipeParams";
import {RecipeNewRecord} from "./create";

@inject("RecipesStore")
export default class RecipeRecord extends React.Component<RecipeParams, any>
{
    RecipesStore: RecipesStore;

    constructor(props: any) {
        super(props);
        this.RecipesStore = props.RecipesStore;
    }

    render() {
        const id = this.props.id;
        const recipe = this.RecipesStore.getRecipe(id);
        const onClick = () => {
            recipe.recipeResultId = this.RecipesStore.getSelectedRecipeResultId;
            recipe.itemId = this.RecipesStore.getSelectedItemId;
            recipe.amount = Number(this.RecipesStore.getAmount);
            this.RecipesStore.save(recipe);
        }

        return (
            <RecipeNewRecord recipe={recipe} onClick={onClick}/>
        );
    }
}