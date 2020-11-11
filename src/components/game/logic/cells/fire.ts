import { ICell } from ".";
import { getCellNeighbours, countType } from "../helpers";
import { CreateEmptyCell } from "./empty";

export const CreateFireCell = (): ICell => {
    return {
        type: "fire",
        icon: String.fromCodePoint(0x1f525),
    };
};

const MIN_NEEDED_TREES = 4;
const MIN_NEEDED_FIRE = 1;

export const simulateFire = (
    board: ICell[],
    boardWidth: number,
    cellNumber: number
): ICell | null => {
    let cell = board[cellNumber];
    let neighbours = getCellNeighbours(board, boardWidth, cellNumber);
    let treeNeighbours = countType(neighbours, "tree");
    let fireNeighbours = countType(neighbours, "fire");

    if (cell.type === "tree") {
        // IF there are too many trees nearby ignite the tree.
        if (treeNeighbours >= MIN_NEEDED_TREES) {
            return CreateFireCell();
        }

        // If there is already a fire nearby, this tree will combust as well
        if (fireNeighbours >= MIN_NEEDED_FIRE) {
            return CreateFireCell();
        }
    }

    // If the cell is already a fire, clear the tile, meaning the fire has burned out
    if (cell.type === "fire") {
        return CreateEmptyCell();
    }

    // No Change happenend according to the rules for this cell.
    return null;
};
