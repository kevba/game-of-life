import { ICell } from ".";
import { getCellNeighbours, countType } from "../helpers";

export const CreateTreeCell = (): ICell => {
    return {
        type: "tree",
        icon: String.fromCodePoint(0x1f332),
    };
};

const REPRODUCE_NEEDED = 1;

export const simulateTree = (
    board: ICell[],
    boardWidth: number,
    cellNumber: number
): ICell | null => {
    let cell = board[cellNumber];
    let neighbours = getCellNeighbours(board, boardWidth, cellNumber);

    let treeNeighbours = countType(neighbours, "tree");

    // Trees will never die, they only grow until something else wipes them out.
    // Trees can grow when a cell is empty, but there are other trees nearby
    if (cell.type === "empty") {
        // There are enough neighbours to reporduce, so a new tree will spawn.
        if (treeNeighbours >= REPRODUCE_NEEDED) {
            return CreateTreeCell();
        }
    }

    // No Change happenend according to the rules for this cell.
    return null;
};
