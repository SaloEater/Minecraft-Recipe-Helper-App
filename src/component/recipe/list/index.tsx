import RecipeResultsStore from "../../../state/recipe-result";
import React from "react";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";
import ItemsStore from "../../../state/item";
import {Recipe} from "../../../type/component/recipe";
import RecipesStore from "../../../state/recipe";
import {ItemLink} from "../../common/link/item";
import {RecipeResultLink} from "../../common/link/recipe-result";

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
                const rr = this.RecipeResultsStore.getRecipeResult(recipe.recipeResultId);
                return items.push(<div>
                    {RecipeResultLink(rr)} with {recipe.amount} of {ItemLink(item)}
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