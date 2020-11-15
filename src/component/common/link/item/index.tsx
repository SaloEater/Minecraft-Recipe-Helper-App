import {Item} from "../../../../type/component/item";
import React from "react";
import {Link} from "react-router-dom";

export const ItemLink = (item: Item) => <Link to={"/item/"+item.id}>{item.name}</Link>