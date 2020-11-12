import { CreateEmptyCell } from "./empty";
import { ICell } from "./base";
import { Cell } from "..";

export interface IAshCell extends ICell {
    type: "ash";
    lifeCount: number;
}

export const CreateAshCell = (): IAshCell => {
    return {
        type: "ash",
        icon: String.fromCodePoint(0x2668),
        lifeCount: 0,
    };
};

const MAX_AGE = 10;

export const simulateAsh = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): Cell | null => {
    // Ash does not do anything, besides exising.
    let cell = board[cellNumber];

    if (cell.type === "ash") {
        if (cell.lifeCount > MAX_AGE) {
            return CreateEmptyCell();
        }

        cell.lifeCount++;
        return cell;
    }

    return null;
};
