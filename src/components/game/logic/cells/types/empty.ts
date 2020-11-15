import { ICell } from "./base";
import { reproduceTree } from "./tree";
import { Cell } from "..";
import { countType, getCellNeighbours } from "../../helpers";
import { CreateFireCell } from "./fire";
import { reproduceRabbit } from "./rabbit";
import { reproduceFox } from "./fox";

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

    const rabbit = reproduceRabbit(board, boardWidth, cellNumber);
    if (rabbit !== undefined) {
        return rabbit;
    }

    const fox = reproduceFox(board, boardWidth, cellNumber);
    if (fox !== undefined) {
        return fox;
    }

    let neighboursRad1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    for (let c of neighboursRad1) {
        if (c.type === "volcano" && c.isErupting) {
            return CreateFireCell();
        }
    }

    // No Change happenend according to the rules for this cell.
    return cell;
};
