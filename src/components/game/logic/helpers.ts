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
    let relativeCellIndex = cellNum % boardWidth;

    const indexMasks = [
        [-1, 0, 1],
        [-1, 1],
        [-1, 0, 1],
    ];

    for (let [i, indexMask] of indexMasks.entries()) {
        let boardWidthModifier = (i - 1) * boardWidth;

        for (let offset of indexMask) {
            let index = cellNum - offset - boardWidthModifier;
            let relativeIndex = relativeCellIndex - offset;

            if (relativeIndex < 0 || relativeIndex > 19) {
                neigbourValues.push(CreateEmptyCell());
                break;
            }

            neigbourValues.push(getCell(cells, index));
        }
    }

    return neigbourValues;
};

const getCell = (cells: ICell[], cellNum: number): ICell => {
    if (cellNum < 0 || cellNum > cells.length - 1) {
        return CreateEmptyCell();
    }

    return cells[cellNum];
};
