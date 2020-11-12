import { emptyCells, simulateStep } from "./logic/index";
import React from "react";
import { Cell } from "./logic/cells";

export const DEFAULT_WIDTH = 40;

export type BoardState = {
    cells: Cell[];
    width: number;
};

export type BoardAction =
    | { type: "setCell"; cellNumber: number; cell: Cell }
    | { type: "setWidth"; width: number }
    | { type: "simulateStep" }
    | { type: "reset" };

export const defaultBoard = {
    cells: emptyCells(DEFAULT_WIDTH),
    width: DEFAULT_WIDTH,
};

export const boardReducer = (
    state: BoardState,
    action: BoardAction
): BoardState => {
    switch (action.type) {
        case "setCell":
            let newCells = [...state.cells];
            newCells[action.cellNumber] = action.cell;

            return {
                ...state,
                cells: newCells,
            };
        case "simulateStep":
            newCells = simulateStep(state.cells, state.width);
            return {
                ...state,
                cells: newCells,
            };
        case "reset":
            return {
                ...state,
                cells: emptyCells(DEFAULT_WIDTH),
                width: DEFAULT_WIDTH,
            };
        case "setWidth":
            return {
                ...state,
                cells: emptyCells(action.width),
                width: action.width,
            };
    }
};

export const BoardContext = React.createContext<BoardState>(null);
export const BoardDispatch = React.createContext<React.Dispatch<BoardAction>>(
    null
);
