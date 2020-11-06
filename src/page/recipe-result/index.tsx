import React from "react";
import {RecipeResultProps} from "../../type/page/recipe-result/RecipeResultProps";
import {RecipeResultList} from "../../component/recipe-result/list";
import RecipeResultRecord from "../../component/recipe-result/record";

export default class RecipeResultPage extends React.Component<RecipeResultProps, any>
{
    render() {
        const id = this.props.match.params.id;
        let component = id
            ? <RecipeResultRecord id={id}/>
            : <RecipeResultList/>
        return (
            <div>{component}</div>
        )
    }
}