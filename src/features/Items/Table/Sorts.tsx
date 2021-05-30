import React from "react";
import { IconButton, TableSortLabel } from "@material-ui/core";
import SortRounded from "@material-ui/icons/SortRounded";

export type IOrder = {
    orderBy: "no" | "name" | "description" | "cost" | "ItemCategoryId" | "ItemTypeId" | "ItemFamilyId" | "SalesApproveId" | "EngineeringApprovesId" | "QOH" | "LastUsed" | "ResellCost";
    order: "asc" | "desc";
};

export default function Sort({
    field,
    order,
    setOrder,
}: {
    field: "no" | "name" | "description" | "cost" | "ItemCategoryId" | "ItemTypeId" | "ItemFamilyId" | "SalesApproveId" | "EngineeringApprovesId" | "QOH" | "LastUsed" | "ResellCost";
    order?: IOrder;
    setOrder: (v: IOrder) => void;
}) {
    if (order?.orderBy !== field) {
        return (
            <IconButton style={{ color: "white" }} onClick={() => setOrder({ order: "asc", orderBy: field })}>
                <SortRounded />
            </IconButton>
        );
    }
    return (
        <TableSortLabel
            style={{ color: "white" }}
            active={order?.orderBy === field}
            direction={order?.orderBy === field ? order.order : undefined}
            onClick={() => setOrder({ orderBy: field, order: order?.order === "asc" ? "desc" : "asc" })}
        />
    );
}
