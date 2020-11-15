import React from "react";
import {Link} from "react-router-dom";
import {RecipeResult} from "../../../../type/component/recipe-result";

export const RecipeResultLink = (rr: RecipeResult) => <Link to={"/recipe-result/"+rr.id}>{rr.name}</Link>