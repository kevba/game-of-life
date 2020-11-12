import { ICell } from "./base";

export interface IEmptyCell extends ICell {
    type: "empty";
}

export const CreateEmptyCell = (): IEmptyCell => {
    return {
        type: "empty",
        icon: "",
    };
};
