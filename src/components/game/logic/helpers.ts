import { ICell } from "./cells/types/base";
import { CreateEmptyCell } from "./cells/types/empty";

export const countType = (neighbours: Cell[], cellType: string): number => {
    let typeCount = 0;
    for (let cell of neighbours) {
        if (cell.type === cellType) {
            typeCount++;
        }
    }

    return typeCount;
};

export const getCellNeighbours = (
    cells: Cell[],
    boardWidth: number,
    cellNum: number
): Cell[] => {
    let neigbourValues = [];
    let relativeCellIndex = cellNum % boardWidth;

    const indexMasks = [
        [-1, 0, 1],
        [-1, 1],
        [-1, 0, 1],
    ];

    for (let [i, indexMask] of indexMasks.entries()) {
        let boardWidthModifier = (i - 1) * boardWidth;

        for (let offset of indexMask) {
            let index = cellNum - offset + boardWidthModifier;
            let relativeIndex = relativeCellIndex - offset;

            if (relativeIndex < 0 || relativeIndex >= boardWidth) {
                neigbourValues.push(CreateEmptyCell());
            } else {
                neigbourValues.push(getCell(cells, index));
            }
        }
    }

    return neigbourValues;
};

const getCell = (cells: Cell[], cellNum: number): ICell => {
    if (cellNum < 0 || cellNum > cells.length - 1) {
        return CreateEmptyCell();
    }

    return cells[cellNum];
};
