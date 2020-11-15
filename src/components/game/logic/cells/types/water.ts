import { getCellNeighbours } from "../../helpers";
import { ICell } from "./base";
import { CreateEmptyCell } from "./empty";
import { Cell } from "..";

export interface IWaterCell extends ICell {
    type: "water";
}

export const CreateWaterCell = (): IWaterCell => {
    return {
        type: "water",
        icon: String.fromCodePoint(0x1f30a),
    };
};

export const simulateWater = (
    board: Cell[],
    cell: IWaterCell,
    boardWidth: number,
    cellNumber: number
): Cell => {
    let neighboursR1 = getCellNeighbours(board, boardWidth, cellNumber, 1);

    for (let c of neighboursR1) {
        if (c.type === "volcano" && c.isErupting) {
            return CreateEmptyCell();
        }
    }

    return cell;
};
