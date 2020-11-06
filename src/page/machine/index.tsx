import {MachineProps} from "../../type/page/machine/MachineProps";
import React from "react";
import {MachineList} from "../../component/machine/list";
import MachineRecord from "../../component/machine/record";

export default class MachinePage extends React.Component<MachineProps, any>
{
    render() {
        const id = this.props.match.params.id;
        let component = id
            ? <MachineRecord id={id}/>
            : <MachineList/>
        return (
            <div>{component}</div>
        )
    }
}