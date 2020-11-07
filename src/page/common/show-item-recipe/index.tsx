import {ShowItemRecipeProps} from "../../../type/page/common/ShowItemRecipeProps";
import React from "react";
import {ShowItemRecipe} from "../../../component/common/show-item-recipe";

export default class ShowItemRecipePage extends React.Component<ShowItemRecipeProps, any>
{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div>
            Test
            <ShowItemRecipe itemId={this.props.match.params.itemId} amount={this.props.match.params.amount}/>
        </div>;
    }
}