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

export type Board = {
    state: ICell[];
    width: number;
};

export function Board(width: number): void {
    this.width = width;
    this.state = emptyBoardState(width);
}

export const emptyBoardState = (size: number): ICell[] => {
    let state: ICell[] = [];

    for (let i = 0; i < size * size; i++) {
        state.push(createDefaultCell());
    }

    return state;
};

const MIN_NEEDED_LIVING_CELLS = 2;
const MAX_NEEDED_LIVING_CELLS = 3;

const REPRODUCE_NEEDED = 3;

export const simulateStep = (board: Board): Board => {
    let newState: ICell[] = [];

    for (let cellNum = 0; cellNum < board.state.length; cellNum++) {
        let cell = board.state[cellNum];

        let neighbours = getCellNeighbours(board, cellNum);
        let isAlive = board.state[cellNum].alive;

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

        newState.push(cell);
    }

    let newBoard: Board = {
        width: board.width,
        state: newState,
    };

    return newBoard;
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

const getCellNeighbours = (board: Board, cellNum: number): ICell[] => {
    let neigbourValues = [];

    for (let topIndex of [-1, 0, 1]) {
        neigbourValues.push(getCell(board, cellNum - topIndex - board.width));
    }

    for (let middleIndex of [-1, 1]) {
        neigbourValues.push(getCell(board, cellNum - middleIndex));
    }

    for (let bottomIndex of [-1, 0, 1]) {
        neigbourValues.push(
            getCell(board, cellNum - bottomIndex + board.width)
        );
    }

    return neigbourValues;
};

const getCell = (board: Board, cellNum: number): ICell => {
    if (cellNum < 0 || cellNum > board.state.length - 1) {
        return createDefaultCell();
    }

    return board.state[cellNum];
};
