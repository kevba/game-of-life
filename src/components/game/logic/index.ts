import { ICell, CellSimulator } from "./cells";
import { CreateEmptyCell } from "./cells/empty";
import { simulateFire } from "./cells/fire";
import { simulateTree } from "./cells/tree";

export const emptyCells = (size: number): ICell[] => {
    let state: ICell[] = [];

    for (let i = 0; i < size * size; i++) {
        state.push(CreateEmptyCell());
    }

    return state;
};

export const simulateStep = (cells: ICell[], boardWidth: number): ICell[] => {
    let newCells: ICell[] = [];

    for (let cellNum = 0; cellNum < cells.length; cellNum++) {
        let newCell = simulateCell(cells, boardWidth, cellNum);
        newCells.push(newCell);
    }

    return newCells;
};

const cellSimulators: CellSimulator[] = [simulateTree, simulateFire];

export const simulateCell = (
    board: ICell[],
    boardWidth: number,
    cellNumber: number
): ICell => {
    // Return the value from the first simulator that returns a value.
    for (let simulate of cellSimulators) {
        let simResult = simulate(board, boardWidth, cellNumber);
        if (simResult !== null) {
            return simResult;
        }
    }

    // If none of the simulators whats to do anyting with the cell, just return the original one
    return board[cellNumber];
};
