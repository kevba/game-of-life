import { IEmptyCell } from "./types/empty";
import { CreateAshCell, IAshCell } from "./types/ash";
import { CreateFireCell, IFireCell } from "./types/fire";
import { CreateTreeCell, ITreeCell } from "./types/tree";
import { IGOLCell } from "./types/gol";
import { CreateWaterCell, IWaterCell } from "./types/water";
import { CreateMountainCell, IMountainCell } from "./types/mountain";
import { CreateVolcanoCell, IVolcanoCell } from "./types/volcano";

export type Cell =
    | IEmptyCell
    | IAshCell
    | IFireCell
    | ITreeCell
    | IGOLCell
    | IWaterCell
    | IMountainCell
    | IVolcanoCell;

export const GetCellTypes = (): Cell[] => {
    return [
        CreateTreeCell(),
        CreateWaterCell(),
        CreateMountainCell(),
        CreateFireCell(),
        CreateAshCell(),
        CreateVolcanoCell(),
    ];
};

export const CellTypeTemplates = GetCellTypes();
