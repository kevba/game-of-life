import { ILivingCell } from "./base";
import { getCellNeighbours, countType, random } from "../../helpers";
import { Cell } from "..";
import { CreateEmptyCell } from "./empty";
import { CreateFireCell } from "./fire";

const rabbit = String.fromCodePoint(0x1f407);

export interface IRabbitCell extends ILivingCell {
    type: "rabbit";
}

export const CreateRabbitCell = (): IRabbitCell => {
    return {
        type: "rabbit",
        icon: rabbit,
        age: 0,
        maxAge: 2,
    };
};

const REPRODUCE_NEEDED_RABBIT = 2;
const REPRODUCE_AGE = 1;
const REPRODUCE_NEEDED_TREE = 4;

export const reproduceRabbit = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): IRabbitCell | undefined => {
    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);

    let treeNeighbours = countType(neighboursRad1, "tree");
    let rabbitNeighbours = countType(neighboursRad1, "rabbit");

    // If there are enough trees, a rabbit will magically spawn from nothing.
    if (treeNeighbours >= REPRODUCE_NEEDED_TREE) {
        return CreateRabbitCell();
    }

    // There are enough neighbours to reproduce, so a new rabbit will spawn.
    if (rabbitNeighbours >= REPRODUCE_NEEDED_RABBIT) {
        // Check if the rabbits are old enough.
        for (let cells of neighboursRad1) {
            if (cells.type === "rabbit" && cells.age >= REPRODUCE_AGE) {
                return CreateRabbitCell();
            }
        }
    }

    return undefined;
};

const MAX_RABBIT_POPULATION = 3;
const MAX_NEARBY_FOX = 1;
const TREES_NEEDED = 1;

export const simulateRabbit = (
    board: Cell[],
    cell: IRabbitCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let neighboursRad2 = getCellNeighbours(board, boardWidth, cellNumber, 2);

    let rabbitNeighbours = countType(neighboursRad1, "rabbit");
    let foxNeighbours = countType(neighboursRad1, "fox");
    let treeNeighbours = countType(neighboursRad2, "tree");

    if (rabbitNeighbours > MAX_RABBIT_POPULATION) {
        return CreateEmptyCell();
    }

    // If there are not enough trees, the rabbit will unfortunately die.
    if (treeNeighbours < TREES_NEEDED) {
        return CreateEmptyCell();
    }

    // The rabbit has been eaten :(.
    if (foxNeighbours > MAX_NEARBY_FOX) {
        return CreateEmptyCell();
    }

    cell.age += 1;
    if (cell.age > cell.maxAge) {
        // The rabbit has some chance to live past its max age.
        if (random(80 + cell.age)) {
            return CreateEmptyCell();
        }
    }
    // No Change happenend according to the rules for this cell.
    return cell;
};
