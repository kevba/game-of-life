import { ICell } from "./base";
import { CreateVolcanoCell } from "./volcano";
import { Cell } from "..";

export interface IMountainCell extends ICell {
    type: "mountain";
}

export const CreateMountainCell = (): IMountainCell => {
    return {
        type: "mountain",
        icon: String.fromCodePoint(0x26f0),
    };
};

export const simulateMountain = (
    board: Cell[],
    cell: IMountainCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    return cell;
};
