import { IEmptyCell } from "./types/empty";
import { CreateAshCell, IAshCell } from "./types/ash";
import { CreateFireCell, IFireCell } from "./types/fire";
import { CreateTreeCell, ITreeCell } from "./types/tree";
import { IGOLCell } from "./types/gol";
import { CreateWaterCell, IWaterCell } from "./types/water";
import { CreateMountainCell, IMountainCell } from "./types/mountain";
import { CreateVolcanoCell, IVolcanoCell } from "./types/volcano";
import { CreateRabbitCell, IRabbitCell } from "./types/rabbit";
import { CreateFoxCell, IFoxCell } from "./types/fox";

export type Cell =
    | IEmptyCell
    | IAshCell
    | IFireCell
    | ITreeCell
    | IGOLCell
    | IWaterCell
    | IMountainCell
    | IVolcanoCell
    | IRabbitCell
    | IFoxCell;

export const GetCellTypes = (): Cell[] => {
    return [
        CreateTreeCell(),
        CreateWaterCell(),
        CreateMountainCell(),
        CreateFireCell(),
        CreateAshCell(),
        CreateVolcanoCell(),
        CreateRabbitCell(),
        CreateFoxCell(),
    ];
};

export type CellType = Cell["type"];

export const CellTypeTemplates = GetCellTypes();
