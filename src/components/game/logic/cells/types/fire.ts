import { Cell } from "..";
import { getCellNeighbours, countType } from "../../helpers";
import { CreateAshCell } from "./ash";
import { ICell, ILivingCell } from "./base";

export interface IFireCell extends ILivingCell {
    type: "fire";
}

export const CreateFireCell = (): IFireCell => {
    return {
        type: "fire",
        icon: String.fromCodePoint(0x1f525),
        age: 0,
        maxAge: 2,
    };
};

export const simulateFire = (
    board: Cell[],
    cell: IFireCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    cell.age += 1;

    if (cell.age > cell.maxAge) {
        return CreateAshCell();
    }

    return cell;
};
