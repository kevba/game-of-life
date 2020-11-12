import { ICell } from "./base";
import { getCellNeighbours, countType } from "../../helpers";
import { Cell } from "..";

export interface ITreeCell extends ICell {
    type: "tree";
}

export const CreateTreeCell = (): ITreeCell => {
    return {
        type: "tree",
        icon: String.fromCodePoint(0x1f332),
    };
};

const REPRODUCE_NEEDED = 1;
const WATER_REPRODUCE_NEEDED = 1;

export const simulateTree = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): Cell | null => {
    let cell = board[cellNumber];
    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let neighboursRad2 = getCellNeighbours(board, boardWidth, cellNumber, 2);

    let treeNeighbours = countType(neighboursRad1, "tree");
    let waterNeighbours = countType(neighboursRad2, "water");

    // Trees will never die, they only grow until something else wipes them out.
    // Trees can grow when a cell is empty, but there are other trees nearby
    if (cell.type === "empty") {
        // There are enough neighbours to reporduce, so a new tree will spawn.
        if (
            treeNeighbours >= REPRODUCE_NEEDED &&
            waterNeighbours >= WATER_REPRODUCE_NEEDED
        ) {
            return CreateTreeCell();
        }
    }

    // No Change happenend according to the rules for this cell.
    return null;
};
