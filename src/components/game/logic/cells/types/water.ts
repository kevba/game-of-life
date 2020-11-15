import { ICell } from "./base";

export interface IWaterCell extends ICell {
    type: "water";
}

export const CreateWaterCell = (): IWaterCell => {
    return {
        type: "water",
        icon: String.fromCodePoint(0x1f30a),
    };
};

// export const simulateWater = (
//     board: Cell[],
//     cell: IWaterCell,
//     boardWidth: number,
//     cellNumber: number
// ): Cell => {
//     // Water cells never dissapear.
//     return cell;
// };
