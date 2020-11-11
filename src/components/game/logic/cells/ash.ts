import { ICell } from ".";

export const CreateAshCell = (): ICell => {
    return {
        type: "ash",
        icon: String.fromCodePoint(0x2668),
    };
};

export const simulateAsh = (
    board: ICell[],
    boardWidth: number,
    cellNumber: number
): ICell | null => {
    // Ash does not do anything, besides exising.
    return null;
};
