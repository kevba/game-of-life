export interface ICell {
    color: string;
    icon: string;
    alive: boolean;
}

export const createDefaultCell = (): ICell => {
    return {
        color: "black",
        icon: String.fromCodePoint(0x1f332),
        alive: false,
    };
};

export const emptyCells = (size: number): ICell[] => {
    let state: ICell[] = [];

    for (let i = 0; i < size * size; i++) {
        state.push(createDefaultCell());
    }

    return state;
};

const MIN_NEEDED_LIVING_CELLS = 2;
const MAX_NEEDED_LIVING_CELLS = 3;

const REPRODUCE_NEEDED = 3;

export const simulateStep = (cells: ICell[], boardWidth: number): ICell[] => {
    let newCells: ICell[] = [];

    for (let cellNum = 0; cellNum < cells.length; cellNum++) {
        let cell = cells[cellNum];

        let neighbours = getCellNeighbours(cells, boardWidth, cellNum);
        let isAlive = cells[cellNum].alive;

        let livingNeighbours = countLiving(neighbours);

        // the cell is alive, check its neighbours to see if it continues to do so.
        if (isAlive) {
            if (livingNeighbours < MIN_NEEDED_LIVING_CELLS) {
                cell.alive = false;
            } else if (livingNeighbours > MAX_NEEDED_LIVING_CELLS) {
                cell.alive = false;
            } else {
                cell.alive = true;
            }
        } else {
            // the cell is dead/unpopulated, check its neighbours to see if a new one can be produced.
            if (livingNeighbours === REPRODUCE_NEEDED) {
                cell.alive = true;
            } else {
                cell.alive = false;
            }
        }

        newCells.push(cell);
    }

    return newCells;
};

const countLiving = (neighbours: ICell[]): number => {
    let liveCellCount = 0;
    for (let cellValue of neighbours) {
        if (cellValue.alive) {
            liveCellCount++;
        }
    }

    return liveCellCount;
};

const getCellNeighbours = (
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
        return createDefaultCell();
    }

    return cells[cellNum];
};
