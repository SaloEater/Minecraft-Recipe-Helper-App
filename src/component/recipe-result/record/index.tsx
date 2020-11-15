import React from "react";
import {inject} from "mobx-react";
import {RecipeResultParams} from "../../../type/page/recipe-result/RecipeResultParams";
import RecipeResultsStore from "../../../state/recipe-result";
import {RecipeResultNewRecord} from "./create";
import RecipesStore from "../../../state/recipe";
import ItemsStore from "../../../state/item";
import styles from "./styles.module.css";
import {RecipeLink} from "../../common/link/recipe";
import {ItemLink} from "../../common/link/item";

@inject("RecipeResultsStore", "RecipesStore", "ItemsStore")
export default class RecipeResultRecord extends React.Component<RecipeResultParams, any>
{
    RecipeResultsStore: RecipeResultsStore;
    RecipesStore: RecipesStore;
    ItemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.RecipeResultsStore = props.RecipeResultsStore;
        this.RecipesStore = props.RecipesStore;
        this.ItemsStore = props.ItemsStore;
    }

    render() {
        const id = this.props.id;
        const rr = this.RecipeResultsStore.getRecipeResult(id);
        const onClick = () => {
            rr.amount = Number(this.RecipeResultsStore.getAmount);
            rr.machineId = this.RecipeResultsStore.getSelectedMachineId;
            rr.resultItemId = this.RecipeResultsStore.getSelectedResultItemId;
            rr.name = this.RecipeResultsStore.getNewName;
            this.RecipeResultsStore.save(rr);
        }
        const _recipes = this.RecipesStore.getRecipes().filter(value => value.recipeResultId == rr.id);
        const recipes: any = [];
        _recipes.forEach(recipe =>
            recipes.push(
                <div className={styles.recipe}>
                    {RecipeLink(recipe)} of {ItemLink(this.ItemsStore.getItem(recipe.itemId))}
                </div>
            )
        );
        return (
            <div>
                <RecipeResultNewRecord rr={rr} onClick={onClick}/>
                Recipe is:
                {recipes}
            </div>
        );
    }
}