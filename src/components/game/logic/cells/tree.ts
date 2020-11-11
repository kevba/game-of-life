import { ICell } from ".";
import { getCellNeighbours, countType } from "../helpers";
import { CreateEmptyCell } from "./empty";

export const CreateTreeCell = (): ICell => {
    return {
        type: "tree",
        icon: String.fromCodePoint(0x1f332),
    };
};

const MIN_NEEDED_LIVING_CELLS = 2;
const MAX_NEEDED_LIVING_CELLS = 3;
const REPRODUCE_NEEDED = 3;

export const simulateTree = (
    board: ICell[],
    boardWidth: number,
    cellNumber: number
): ICell | null => {
    let cell = board[cellNumber];
    let neighbours = getCellNeighbours(board, boardWidth, cellNumber);
    let treeNeighbours = countType(neighbours, "tree");

    // the cell is alive, check its neighbours to see if it continues to do so.
    if (cell.type === "tree") {
        // the tree dies if there are not enough neighbours
        if (treeNeighbours < MIN_NEEDED_LIVING_CELLS) {
            return CreateEmptyCell();
            // the tree dies if there are too many neighbours, as by overpopulation.
        } else if (treeNeighbours > MAX_NEEDED_LIVING_CELLS) {
            return CreateEmptyCell();
        }
    }

    // the cell is dead/unpopulated, check its neighbours to see if a new one can be produced.
    if (cell.type === "empty") {
        // There are enough neighbours to reporduce, so a new tree will spawn.
        if (treeNeighbours === REPRODUCE_NEEDED) {
            return CreateTreeCell();
        }
    }

    // No Change happenend according to the rules for this cell.
    return null;
};
