import { ICell } from "./base";
import { getCellNeighbours, countType } from "../../helpers";
import { CreateEmptyCell } from "./empty";
import { Cell } from "..";

export interface IGOLCell extends ICell {
    type: "gol";
}

// GOL behaves like the original Game of Life cells.
export const CreateGOLCell = (): IGOLCell => {
    return {
        type: "gol",
        icon: "X",
    };
};

const MIN_NEEDED_LIVING_CELLS = 2;
const MAX_NEEDED_LIVING_CELLS = 3;
const REPRODUCE_NEEDED = 3;

export const simulateGOL = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): Cell | null => {
    let cell = board[cellNumber];
    let neighbours = getCellNeighbours(board, boardWidth, cellNumber);
    let golNeighbours = countType(neighbours, "gol");

    // the cell is alive, check its neighbours to see if it continues to do so.
    if (cell.type === "gol") {
        // the gol dies if there are not enough neighbours
        if (golNeighbours < MIN_NEEDED_LIVING_CELLS) {
            return CreateEmptyCell();
            // the gol dies if there are too many neighbours, as by overpopulation.
        } else if (golNeighbours > MAX_NEEDED_LIVING_CELLS) {
            return CreateEmptyCell();
        }
    }

    // the cell is dead/unpopulated, check its neighbours to see if a new one can be produced.
    if (cell.type === "empty") {
        // There are enough neighbours to reporduce, so a new gol will spawn.
        if (golNeighbours === REPRODUCE_NEEDED) {
            return CreateGOLCell();
        }
    }

    // No Change happenend according to the rules for this cell.
    return null;
};
