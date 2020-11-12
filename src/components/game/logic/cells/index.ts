import { CreateEmptyCell, IEmptyCell } from "./types/empty";
import { CreateAshCell, IAshCell } from "./types/ash";
import { CreateFireCell, IFireCell } from "./types/fire";
import { CreateTreeCell, ITreeCell } from "./types/tree";
import { IGOLCell } from "./types/gol";
import { CreateWaterCell, IWaterCell } from "./types/water";

export type Cell =
    | IEmptyCell
    | IAshCell
    | IFireCell
    | ITreeCell
    | IGOLCell
    | IWaterCell;

export const GetCellTypes = (): Cell[] => {
    return [
        CreateTreeCell(),
        CreateWaterCell(),
        CreateFireCell(),
        CreateAshCell(),
        CreateEmptyCell(),
    ];
};

export type CellSimulator = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
) => Cell | null;
