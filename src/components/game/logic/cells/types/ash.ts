import { CreateEmptyCell } from "./empty";
import { ICell } from "./base";
import { Cell } from "..";

export interface IAshCell extends ICell {
    type: "ash";
}

export const CreateAshCell = (): IAshCell => {
    return {
        type: "ash",
        icon: String.fromCodePoint(0x2668),
    };
};

export const simulateAsh = (
    board: Cell[],
    cell: IAshCell,
    boardWidth: number,
    cellNumber: number
): Cell | null => {
    // Ash does not do anything, besides exising,a nd then immidiatly dissapearing.
    return CreateEmptyCell();
};
