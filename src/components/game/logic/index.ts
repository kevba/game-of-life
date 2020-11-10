import { ICell } from "./cells";
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

export const simulateCell = (
    board: ICell[],
    boardWidth: number,
    cellNumber: number
): ICell => {
    const cell = board[cellNumber];

    let newCell: ICell = CreateEmptyCell();

    if (cell.type === "empty" || cell.type === "tree") {
        newCell = simulateTree(board, boardWidth, cellNumber);
    }

    if (newCell.type === "empty" || cell.type === "fire") {
        newCell = simulateFire(board, boardWidth, cellNumber);
    }

    return newCell;
};
