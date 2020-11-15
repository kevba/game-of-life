import { ICell } from "./base";
import { reproduceTree } from "./tree";
import { Cell } from "..";
import { countType, getCellNeighbours } from "../../helpers";
import { CreateFireCell } from "./fire";

export interface IEmptyCell extends ICell {
    type: "empty";
}

export const CreateEmptyCell = (): IEmptyCell => {
    return {
        type: "empty",
        icon: String.fromCodePoint(0x3000),
    };
};

export const simulateEmpty = (
    board: Cell[],
    cell: IEmptyCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    const tree = reproduceTree(board, boardWidth, cellNumber);
    if (tree !== undefined) {
        return tree;
    }

    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let volcanoCount = countType(neighboursRad1, "volcano");
    if (volcanoCount > 0) {
        return CreateFireCell();
    }

    // No Change happenend according to the rules for this cell.
    return cell;
};
