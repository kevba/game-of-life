import { ICell } from "./base";

export interface IVolcanoCell extends ICell {
    type: "volcano";
}

export const CreateVolcanoCell = (): IVolcanoCell => {
    return {
        type: "volcano",
        icon: String.fromCodePoint(0x1f30b),
    };
};
