import React from "react";
import MachinesStore from "../../../state/machine";
import {inject} from "mobx-react";
import {Link} from "react-router-dom";
import {MachineParams} from "../../../type/page/machine/MachineParams";

@inject("MachinesStore")
export default class MachineRecord extends React.Component<MachineParams, any>
{
    MachinesStore: MachinesStore;

    constructor(props: any) {
        super(props);
        this.MachinesStore = props.MachinesStore;
    }

    render() {
        const id = this.props.id;
        const machine = this.MachinesStore.getMachine(id);
        return (
            <div>Machine: { "{id: "} <Link to={"/machine/"+id}>{id}</Link> {", name: " + machine.name + "}" } </div>
        );
    }
}