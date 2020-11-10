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
): ICell => {
    let cell = board[cellNumber];
    let neighbours = getCellNeighbours(board, boardWidth, cellNumber);
    let livingNeighbours = countType(neighbours, "tree");

    // the cell is alive, check its neighbours to see if it continues to do so.
    if (cell.type === "empty") {
        if (livingNeighbours < MIN_NEEDED_LIVING_CELLS) {
            return CreateEmptyCell();
        } else if (livingNeighbours > MAX_NEEDED_LIVING_CELLS) {
            return CreateEmptyCell();
        } else {
            return CreateTreeCell();
        }
    } else {
        // the cell is dead/unpopulated, check its neighbours to see if a new one can be produced.
        if (livingNeighbours !== REPRODUCE_NEEDED) {
            return CreateEmptyCell();
        } else {
            return CreateTreeCell();
        }
    }
};
