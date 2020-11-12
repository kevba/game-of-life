import React from "react";
import { Cell } from "./logic/cells";
import { CreateTreeCell } from "./logic/cells/types/tree";

export const DEFAULT_WIDTH = 40;

export type CellControlState = {
    cell: Cell;
};

export type CellControlAction = { type: "setCellType"; cell: Cell };

export const defaultCellControl = {
    cell: CreateTreeCell(),
};

export const cellControlReducer = (
    state: CellControlState,
    action: CellControlAction
): CellControlState => {
    switch (action.type) {
        case "setCellType":
            return {
                ...state,
                cell: { ...action.cell },
            };
    }
};

export const CellControlContext = React.createContext<CellControlState>(null);
export const CellControlDispatch = React.createContext<
    React.Dispatch<CellControlAction>
>(null);
