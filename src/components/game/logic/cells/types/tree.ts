import { ILivingCell } from "./base";
import { getCellNeighbours, countType } from "../../helpers";
import { Cell } from "..";
import { CreateEmptyCell } from "./empty";
import { CreateFireCell } from "./fire";

const seedling = String.fromCodePoint(0x1f331);
const evergreen = String.fromCodePoint(0x1f332);
const decidious = String.fromCodePoint(0x1f333);

export interface ITreeCell extends ILivingCell {
    type: "tree";
}

export const CreateTreeCell = (): ITreeCell => {
    return {
        type: "tree",
        icon: seedling,
        age: 0,
        maxAge: 10,
    };
};

const REPRODUCE_NEEDED = 1;
const REPRODUCE_AGE = 5;
const WATER_REPRODUCE_NEEDED = 1;
const MAX_ALLOWED_FIRE = 0;
const MIN_NEEDED_WATER = 1;

export const reproduceTree = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): ITreeCell | undefined => {
    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let neighboursRad2 = getCellNeighbours(board, boardWidth, cellNumber, 2);

    let treeNeighbours = countType(neighboursRad1, "tree");
    let waterNeighbours = countType(neighboursRad2, "water");

    // There are enough neighbours to reproduce, so a new tree will spawn.
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

    return undefined;
};

export const simulateTree = (
    board: Cell[],
    cell: ITreeCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    let neighboursR1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let fireNeighbours = countType(neighboursR1, "fire");

    let neighboursR2 = getCellNeighbours(board, boardWidth, cellNumber, 2);
    let waterNeighbours = countType(neighboursR2, "water");

    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let volcanoCount = countType(neighboursRad1, "volcano");

    if (volcanoCount > 0) {
        return CreateFireCell();
    }
    // If there is already some fire nearby, this tree will combust.
    if (fireNeighbours > MAX_ALLOWED_FIRE) {
        return CreateFireCell();
    }

    // There is not enoug water, so the tree dies.
    if (waterNeighbours < MIN_NEEDED_WATER) {
        return CreateEmptyCell();
    }

    cell.age += 1;

    // The tree got too old, RIP.
    if (cell.age > cell.maxAge) {
        return CreateEmptyCell();
    }

    if (cell.age == REPRODUCE_AGE) {
        if (Math.random() < 0.5) {
            cell.icon = evergreen;
        } else {
            cell.icon = decidious;
        }
    }

    // No Change happenend according to the rules for this cell.
    return cell;
};
