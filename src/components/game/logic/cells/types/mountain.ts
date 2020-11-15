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

// a mountain has a small change to turn into a volcano. This is a scale from 1 to 1000
const VOLCANO_CHANCE = 1;

export const simulateMountain = (
    board: Cell[],
    cell: IMountainCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    if (Math.floor(Math.random()) * 1000 < VOLCANO_CHANCE) {
        return CreateVolcanoCell();
    }

    return cell;
};
