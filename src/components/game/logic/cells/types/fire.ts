import { Cell } from "..";
import { getCellNeighbours, countType } from "../../helpers";
import { CreateAshCell } from "./ash";
import { ICell, IAgingCell } from "./base";

export interface IFireCell extends IAgingCell {
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
    let neighboursR1 = getCellNeighbours(board, boardWidth, cellNumber, 1);

    // Fire won't stop buring while there is an active volcano nearby.
    for (let c of neighboursR1) {
        if (c.type === "volcano" && c.isErupting) {
            return cell;
        }
    }

    cell.age += 1;

    if (cell.age > cell.maxAge) {
        return CreateAshCell();
    }

    return cell;
};
