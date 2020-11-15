import {Item} from "../index";

export interface ItemEditForm
{
    item: Item|null,
    onClick: () => void;
}