import { IEmptyCell } from "./types/empty";
import { CreateAshCell, IAshCell } from "./types/ash";
import { CreateFireCell, IFireCell } from "./types/fire";
import { CreateTreeCell, ITreeCell } from "./types/tree";
import { IGOLCell } from "./types/gol";
import { CreateWaterCell, IWaterCell } from "./types/water";
import { CreateMountainCell, IMountainCell } from "./types/mountain";

export type Cell =
    | IEmptyCell
    | IAshCell
    | IFireCell
    | ITreeCell
    | IGOLCell
    | IWaterCell
    | IMountainCell;

export const GetCellTypes = (): Cell[] => {
    return [
        CreateTreeCell(),
        CreateWaterCell(),
        CreateMountainCell(),
        CreateFireCell(),
        CreateAshCell(),
    ];
};

export const CellTypeTemplates = GetCellTypes();

export type CellSimulator = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
) => Cell | null;
