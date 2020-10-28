export type boardState = number[][];

export const emptyBoardState = (size: number): boardState => {
    let arr: number[][] = [];

    for (let i = 0; i < size; i++) {
        arr[i] = [];

        for (let j = 0; j < size; j++) {
            arr[i].push(0);
        }
    }

    return arr;
};

const MIN_NEEDED_LIVING_CELLS = 2;
const MAX_NEEDED_LIVING_CELLS = 3;

const REPRODUCE_NEEDED = 3;

export const simulateStep = (state: boardState): boardState => {
    let newState = emptyBoardState(state.length);

    for (let rowNum = 0; rowNum < state.length; rowNum++) {
        for (let columnNum = 0; columnNum < state[rowNum].length; columnNum++) {
            let neighbours = getCellNeighbours(state, rowNum, columnNum);
            let cellValue = state[rowNum][columnNum];

            let livingNeighbours = countLiving(neighbours);

            let newCellValue = 0;
            // the cell is alive, check its neighbours to see if it continues to do so.
            if (cellValue === 1) {
                if (livingNeighbours < MIN_NEEDED_LIVING_CELLS) {
                    newCellValue = 0;
                } else if (livingNeighbours > MAX_NEEDED_LIVING_CELLS) {
                    newCellValue = 0;
                } else {
                    newCellValue = 1;
                }
            } else {
                // the cell is dead/unpopulated, check its neighbours to see if a new one can be produced.
                if (livingNeighbours === REPRODUCE_NEEDED) {
                    newCellValue = 1;
                } else {
                    newCellValue = 0;
                }
            }

            newState[rowNum][columnNum] = newCellValue;
        }
    }

    return newState;
};

const countLiving = (neighbours: number[]): number => {
    let liveCellCount = 0;
    for (let cellValue of neighbours) {
        if (cellValue) {
            liveCellCount++;
        }
    }

    return liveCellCount;
};

const getCellNeighbours = (
    state: boardState,
    cellRow: number,
    cellColumn: number
): number[] => {
    let neigbourValues = [];

    // topleft
    neigbourValues.push(getCellValue(state, cellRow - 1, cellColumn - 1));
    // topmiddle
    neigbourValues.push(getCellValue(state, cellRow - 1, cellColumn));
    // topright
    neigbourValues.push(getCellValue(state, cellRow - 1, cellColumn + 1));

    // middleleft
    neigbourValues.push(getCellValue(state, cellRow, cellColumn - 1));
    // middleright
    neigbourValues.push(getCellValue(state, cellRow, cellColumn + 1));

    // bottomleft
    neigbourValues.push(getCellValue(state, cellRow + 1, cellColumn - 1));
    // bottommiddle
    neigbourValues.push(getCellValue(state, cellRow + 1, cellColumn));
    // bottomright
    neigbourValues.push(getCellValue(state, cellRow + 1, cellColumn + 1));

    return neigbourValues;
};

const getCellValue = (
    state: boardState,
    cellRow: number,
    cellColumn: number
): number => {
    if (cellRow < 0 || cellRow > state.length - 1) {
        return 0;
    }

    if (cellColumn < 0 || cellColumn > state[cellRow].length - 1) {
        return 0;
    }

    return state[cellRow][cellColumn];
};

export const addGlider = (
    state: boardState,
    startRow: number,
    startColumn: number
): boardState => {
    state[startRow][startColumn] = 0;
    state[startRow][startColumn + 1] = 1;
    state[startRow][startColumn + 2] = 0;

    state[startRow + 1][startColumn] = 0;
    state[startRow + 1][startColumn + 1] = 0;
    state[startRow + 1][startColumn + 2] = 1;

    state[startRow + 2][startColumn] = 1;
    state[startRow + 2][startColumn + 1] = 1;
    state[startRow + 2][startColumn + 2] = 1;

    return state;
};
