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
