import { ICell } from "./base";
import { getCellNeighbours, countType } from "../../helpers";
import { Cell } from "..";
import { CreateEmptyCell } from "./empty";

const seedling = String.fromCodePoint(0x1f331);
const evergreen = String.fromCodePoint(0x1f332);
const decidious = String.fromCodePoint(0x1f333);

export interface ITreeCell extends ICell {
    type: "tree";
    age: number;
}

export const CreateTreeCell = (): ITreeCell => {
    return {
        type: "tree",
        icon: seedling,
        age: 0,
    };
};

const REPRODUCE_NEEDED = 1;
const REPRODUCE_AGE = 5;

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

    // Trees can grow when a cell is empty, and there are other trees nearby
    if (cell.type === "empty") {
        // There are enough neighbours to reporduce, so a new tree will spawn.
        if (
            treeNeighbours >= REPRODUCE_NEEDED &&
            waterNeighbours >= WATER_REPRODUCE_NEEDED
        ) {
            // Check if the trees are old enough.
            for (let cells of neighboursRad1) {
                if (cells.type === "tree" && cells.age >= REPRODUCE_AGE) {
                    return CreateTreeCell();
                }
            }
        }
    }

    if (cell.type === "tree") {
        cell.age += 1;

        if (waterNeighbours < WATER_REPRODUCE_NEEDED) {
            if (cell.age >= REPRODUCE_AGE) {
                return CreateEmptyCell();
            }
        }
        if (cell.age == REPRODUCE_AGE) {
            if (Math.random() < 0.5) {
                cell.icon = evergreen;
            } else {
                cell.icon = decidious;
            }
        }
    }

    // No Change happenend according to the rules for this cell.
    return null;
};
