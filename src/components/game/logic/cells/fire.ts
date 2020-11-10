import { ICell } from ".";
import { getCellNeighbours, countType } from "../helpers";
import { CreateEmptyCell } from "./empty";

export const CreateFireCell = (): ICell => {
    return {
        type: "fire",
        icon: String.fromCodePoint(0x1f525),
    };
};

const MIN_NEEDED_TREES = 5;

export const simulateFire = (
    board: ICell[],
    boardWidth: number,
    cellNumber: number
): ICell => {
    let cell = board[cellNumber];
    let neighbours = getCellNeighbours(board, boardWidth, cellNumber);
    let treeNeighbours = countType(neighbours, "tree");

    // If the cell is empty, start a fire if enough trees are nearby.
    if (cell.type === "empty") {
        if (treeNeighbours > MIN_NEEDED_TREES) {
            return CreateFireCell();
        }
    }

    return CreateEmptyCell();
};
