export type cellTypes = "gol" | "empty" | "tree" | "fire" | "ash";

export interface ICell {
    type: cellTypes;
    icon: string;
}

export type CellSimulator = (
    board: ICell[],
    boardWidth: number,
    cellNumber: number
) => ICell | null;
