import { ICell } from "./cells/types/base";
import { CreateEmptyCell } from "./cells/types/empty";
import { Cell } from "./cells";

export const countType = (neighbours: Cell[], cellType: string): number => {
    let typeCount = 0;
    for (let cell of neighbours) {
        if (cell.type === cellType) {
            typeCount++;
        }
    }

    return typeCount;
};

export type boardMask = { cellOffset: number; rowOffset: number }[];

export const getCellNeighbours = (
    cells: Cell[],
    boardWidth: number,
    cellNum: number,
    radius: number = 1
): Cell[] => {
    let mask: boardMask = [];
    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            // This is the cell itself, whcih is of course not a neighbour
            if (i == 0 && j === 0) {
                continue;
            }
            mask.push({
                cellOffset: j,
                rowOffset: i,
            });
        }
    }

    return getMaskedCells(cells, boardWidth, cellNum, mask);
};

const getMaskedCells = (
    cells: Cell[],
    boardWidth: number,
    cellNum: number,
    mask: boardMask
): Cell[] => {
    let maskValues = [];
    let relativeCellIndex = cellNum % boardWidth;

    for (let modifiers of mask) {
        let boardWidthModifier = modifiers.rowOffset * boardWidth;

        let index = cellNum - modifiers.cellOffset + boardWidthModifier;
        let relativeIndex = relativeCellIndex - modifiers.cellOffset;

        if (relativeIndex < 0 || relativeIndex >= boardWidth) {
            maskValues.push(CreateEmptyCell());
        } else {
            maskValues.push(getCell(cells, index));
        }
    }

    return maskValues;
};

const getCell = (cells: Cell[], cellNum: number): ICell => {
    if (cellNum < 0 || cellNum > cells.length - 1) {
        return CreateEmptyCell();
    }

    return cells[cellNum];
};

export const random = (percent: number): boolean => {
    return Math.random() * 100 < percent;
};
