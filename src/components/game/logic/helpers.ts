import { cellTypes, ICell } from "./cells";
import { CreateEmptyCell } from "./cells/empty";

export const countType = (neighbours: ICell[], cellType: cellTypes): number => {
    let typeCount = 0;
    for (let cell of neighbours) {
        if (cell.type === cellType) {
            typeCount++;
        }
    }

    return typeCount;
};

export const getCellNeighbours = (
    cells: ICell[],
    boardWidth: number,
    cellNum: number
): ICell[] => {
    let neigbourValues = [];

    for (let topIndex of [-1, 0, 1]) {
        neigbourValues.push(getCell(cells, cellNum - topIndex - boardWidth));
    }

    for (let middleIndex of [-1, 1]) {
        neigbourValues.push(getCell(cells, cellNum - middleIndex));
    }

    for (let bottomIndex of [-1, 0, 1]) {
        neigbourValues.push(getCell(cells, cellNum - bottomIndex + boardWidth));
    }

    return neigbourValues;
};

const getCell = (cells: ICell[], cellNum: number): ICell => {
    if (cellNum < 0 || cellNum > cells.length - 1) {
        return CreateEmptyCell();
    }

    return cells[cellNum];
};
