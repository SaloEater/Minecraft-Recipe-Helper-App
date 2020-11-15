import {Machine} from "../../../../type/component/machine";
import React from "react";
import {Link} from "react-router-dom";

export const MachineLink = (machine: Machine) => <Link to={"/machine/"+machine.id}>{machine.name}</Link>