import {CreateProps} from "../../../type/page/create/CreateProps";
import React from "react";

export default class CreatePage extends React.Component<CreateProps, any>
{
    render() {
        return (
            <div>
                {"Create form for " + this.props.match.params.entity}
            </div>
        );
    }
}