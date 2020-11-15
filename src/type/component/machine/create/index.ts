import {Machine} from "../index";

export interface MachineEditForm
{
    machine: Machine|null,
    onClick: () => void;
}