import { CreateEmptyCell, simulateEmpty } from "./cells/types/empty";

import { simulateAsh } from "./cells/types/ash";
import { simulateFire } from "./cells/types/fire";
import { simulateTree } from "./cells/types/tree";

import { Cell } from "./cells";
import { simulateMountain } from "./cells/types/mountain";

export const emptyCells = (size: number): Cell[] => {
    let state: Cell[] = [];

    for (let i = 0; i < size * size; i++) {
        state.push(CreateEmptyCell());
    }

    return state;
};

export const simulateStep = (cells: Cell[], boardWidth: number): Cell[] => {
    let newCells: Cell[] = [];

    for (let cellNum = 0; cellNum < cells.length; cellNum++) {
        let newCell = simulateCell(cells, boardWidth, cellNum);
        newCells.push(newCell);
    }

    return newCells;
};

export const simulateCell = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): Cell => {
    let cell = board[cellNumber];

    switch (cell.type) {
        case "empty":
            return simulateEmpty(board, cell, boardWidth, cellNumber);
        case "tree":
            return simulateTree(board, cell, boardWidth, cellNumber);
        case "fire":
            return simulateFire(board, cell, boardWidth, cellNumber);
        case "ash":
            return simulateAsh(board, cell, boardWidth, cellNumber);
        case "mountain":
            return simulateMountain(board, cell, boardWidth, cellNumber);
    }

    // If none of the simulators whats to do anyting with the cell, just return the original one
    return cell;
};
