import { ICell } from "./base";

export interface IMountainCell extends ICell {
    type: "mountain";
}

export const CreateMountainCell = (): IMountainCell => {
    return {
        type: "mountain",
        icon: String.fromCodePoint(0x26f0),
    };
};
