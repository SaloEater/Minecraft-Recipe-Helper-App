import {Recipe} from "../index";

export interface RecipeEditForm
{
    recipe: Recipe|null,
    onClick: () => void;
}