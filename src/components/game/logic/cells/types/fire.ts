import { Cell } from "..";
import { getCellNeighbours, countType } from "../../helpers";
import { CreateAshCell } from "./ash";
import { ICell } from "./base";

export interface IFireCell extends ICell {
    type: "fire";
}

export const CreateFireCell = (): IFireCell => {
    return {
        type: "fire",
        icon: String.fromCodePoint(0x1f525),
    };
};

const MIN_NEEDED_TREES = 8;

const MIN_NEEDED_FIRE = 1;
const MIN_NEEDED_TREES_NEAR_FIRE = 8;

export const simulateFire = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): Cell | null => {
    let cell = board[cellNumber];
    let neighbours = getCellNeighbours(board, boardWidth, cellNumber);
    let treeNeighbours = countType(neighbours, "tree");
    let fireNeighbours = countType(neighbours, "fire");

    if (cell.type === "tree") {
        // If there are too many other trees nearby ignite the tree.
        if (treeNeighbours >= MIN_NEEDED_TREES) {
            return CreateFireCell();
        }

        // If there is already some fire nearby, this tree will combust as well, as log as ther are enough trees nearby
        if (
            fireNeighbours >= MIN_NEEDED_FIRE &&
            treeNeighbours >= MIN_NEEDED_TREES_NEAR_FIRE
        ) {
            return CreateFireCell();
        }
    }

    // If the cell is already a fire, clear the tile, meaning the fire has burned out
    if (cell.type === "fire") {
        return CreateAshCell();
    }

    // No change happenend according to the rules for this cell.
    return null;
};
