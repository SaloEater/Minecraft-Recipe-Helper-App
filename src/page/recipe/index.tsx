import React from "react";
import {RecipeProps} from "../../type/page/recipe/RecipeProps";
import {RecipeList} from "../../component/recipe/list";
import RecipeRecord from "../../component/recipe/record";

export default class RecipePage extends React.Component<RecipeProps, any>
{
    render() {
        const id = this.props.match.params.id;
        let component = id
            ? <RecipeRecord id={id}/>
            : <RecipeList/>
        return (
            <div>{component}</div>
        )
    }
}