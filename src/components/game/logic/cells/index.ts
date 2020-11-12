import { IEmptyCell } from "./types/empty";
import { IAshCell } from "./types/ash";
import { IFireCell } from "./types/fire";
import { ITreeCell } from "./types/tree";
import { IGOLCell } from "./types/gol";

export type Cell = IEmptyCell | IAshCell | IFireCell | ITreeCell | IGOLCell;

export type CellSimulator = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
) => Cell | null;
