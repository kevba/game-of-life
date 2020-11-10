import { ICell } from ".";

export const CreateEmptyCell = (): ICell => {
    return {
        type: "empty",
        icon: "",
    };
};
