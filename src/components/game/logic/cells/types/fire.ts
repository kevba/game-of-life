import { Cell } from "..";
import { getCellNeighbours, countType } from "../../helpers";
import { CreateAshCell } from "./ash";
import { ICell } from "./base";

export interface IFireCell extends ICell {
    type: "fire";
    lifeCount: number;
}

export const CreateFireCell = (): IFireCell => {
    return {
        type: "fire",
        icon: String.fromCodePoint(0x1f525),
        lifeCount: 0,
    };
};

const MIN_NEEDED_FIRE = 1;
const MIN_NEEDED_TREES_NEAR_FIRE = 1;

const MAX_LIFE_TIME = 3;

export const simulateFire = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): Cell | null => {
    let cell = board[cellNumber];
    let neighbours = getCellNeighbours(board, boardWidth, cellNumber, 2);
    let treeNeighbours = countType(neighbours, "tree");
    let fireNeighbours = countType(neighbours, "fire");

    if (cell.type === "tree") {
        // If there is already some fire nearby, this tree will combust as well, as log as there are enough trees nearby
        if (
            fireNeighbours >= MIN_NEEDED_FIRE &&
            treeNeighbours >= MIN_NEEDED_TREES_NEAR_FIRE
        ) {
            return CreateFireCell();
        }
    }

    // If the cell is already a fire, clear the tile, meaning the fire has burned out
    if (cell.type === "fire") {
        if (cell.lifeCount > MAX_LIFE_TIME) {
            return CreateAshCell();
        }

        cell.lifeCount++;
    }

    // No change happenend according to the rules for this cell.
    return null;
};
