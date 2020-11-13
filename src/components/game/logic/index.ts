import { CreateEmptyCell } from "./cells/types/empty";

import { simulateAsh } from "./cells/types/ash";
import { simulateFire } from "./cells/types/fire";
import { simulateTree } from "./cells/types/tree";

import { Cell } from "./cells";
import { CellSimulator } from "./cells";

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

const cellSimulators: {
    depedencies: Cell["type"][];
    simulate: CellSimulator;
}[] = [
    { depedencies: ["tree", "empty"], simulate: simulateTree },
    { depedencies: ["fire", "tree"], simulate: simulateFire },
    { depedencies: ["ash"], simulate: simulateAsh },
];

export const simulateCell = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): Cell => {
    let cell = board[cellNumber];

    for (let simulators of cellSimulators) {
        if (!simulators.depedencies.includes(cell.type)) {
            continue;
        }

        let simResult = simulators.simulate(board, boardWidth, cellNumber);
        if (simResult !== null) {
            return simResult;
        }
    }

    // If none of the simulators whats to do anyting with the cell, just return the original one
    return board[cellNumber];
};
