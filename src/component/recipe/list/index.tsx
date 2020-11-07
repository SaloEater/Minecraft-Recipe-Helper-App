import RecipeResultsStore from "../../../state/recipe-result";
import React from "react";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";
import ItemsStore from "../../../state/item";
import {Recipe} from "../../../type/component/recipe";
import RecipesStore from "../../../state/recipe";

class InnerRecipeList extends React.Component<any, any>
{
    RecipesStore: RecipesStore;
    RecipeResultsStore: RecipeResultsStore;
    ItemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.RecipesStore = props.RecipesStore;
        this.RecipeResultsStore = props.RecipeResultsStore;
        this.ItemsStore = props.ItemsStore;
    }

    render() {
        const items: any[] = [];
        this.RecipesStore.getRecipes().forEach(
            (recipe: Recipe) => {
                const item = this.ItemsStore.getItem(recipe.itemId);
                const recipeResult = this.RecipeResultsStore.getRecipeResult(recipe.recipeResultId);
                const resultItem = this.ItemsStore.getItem(recipeResult.resultItemId);
                return items.push(<div>
                    <Link to={"/recipe/"+recipe.id}>Edit</Link>: {resultItem.name} using {recipe.amount} of {item.name}
                </div>);
            }
        );
        console.log(items);
        return (
            <div className={styles.items}>{items}</div>
        );
    }
}

export const RecipeList = inject(
    "RecipesStore", "RecipeResultsStore", "ItemsStore"
)(observer(InnerRecipeList));