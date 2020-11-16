import { ILivingCell } from "./base";
import { getCellNeighbours, countType, random } from "../../helpers";
import { Cell } from "..";
import { CreateEmptyCell } from "./empty";

const fox = String.fromCodePoint(0x1f98a);

export interface IFoxCell extends ILivingCell {
    type: "fox";
}

export const CreateFoxCell = (): IFoxCell => {
    return {
        type: "fox",
        icon: fox,
        age: 0,
        maxAge: 5,
        burnable: true,
    };
};

const REPRODUCE_NEEDED_FOX = 2;
const REPRODUCE_AGE = 2;
const REPRODUCE_NEEDED_RABBITS = 3;

export const reproduceFox = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): IFoxCell | undefined => {
    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);

    let rabbitNeighbours = countType(neighboursRad1, "rabbit");
    let foxNeighbours = countType(neighboursRad1, "fox");

    // If there are enough rabbits, a fox will magically spawn from nothing.
    if (rabbitNeighbours >= REPRODUCE_NEEDED_RABBITS) {
        return CreateFoxCell();
    }

    // There are enough neighbours to reproduce, so a new fox will spawn.
    if (foxNeighbours >= REPRODUCE_NEEDED_FOX) {
        // Check if the foxs are old enough.
        for (let cells of neighboursRad1) {
            if (cells.type === "fox" && cells.age >= REPRODUCE_AGE) {
                return CreateFoxCell();
            }
        }
    }

    return undefined;
};

const MAX_FOX_POPULATION = 2;
const RABBITS_NEEDED = 3;

export const simulateFox = (
    board: Cell[],
    cell: IFoxCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let neighboursRad2 = getCellNeighbours(board, boardWidth, cellNumber, 2);

    let foxNeighbours = countType(neighboursRad1, "fox");
    let rabbitNeighbours = countType(neighboursRad2, "rabbit");

    if (foxNeighbours > MAX_FOX_POPULATION) {
        return CreateEmptyCell();
    }

    // If there are not enough rabbits, the fox will unfortunately starve to death.
    if (rabbitNeighbours < RABBITS_NEEDED) {
        return CreateEmptyCell();
    }

    // No Change happenend according to the rules for this cell.
    return cell;
};
