import React from "react";
import {Recipe} from "../../../../type/component/recipe";
import {Link} from "react-router-dom";

export const RecipeLink = (recipe: Recipe) => <Link to={"/recipe/"+recipe.id}>{recipe.amount}</Link>