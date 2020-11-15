import {RecipeResult} from "../index";

export interface RecipeResultEditForm
{
    rr: RecipeResult|null,
    onClick: () => void;
}