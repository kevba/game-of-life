import { CreateEmptyCell, simulateEmpty } from "./cells/types/empty";

import { simulateAsh } from "./cells/types/ash";
import { CreateFireCell, simulateFire } from "./cells/types/fire";
import { simulateTree } from "./cells/types/tree";

import { Cell } from "./cells";
import { simulateMountain } from "./cells/types/mountain";
import { simulateVolcano } from "./cells/types/volcano";
import { simulateWater } from "./cells/types/water";
import { simulateRabbit } from "./cells/types/rabbit";
import { simulateFox } from "./cells/types/fox";
import { ILivingCell, instanceOfLivingCell } from "./cells/types/base";
import { countType, getCellNeighbours } from "./helpers";

export const emptyCells = (size: number): Cell[] => {
    let state: Cell[] = [];

    for (let i = 0; i < size * size; i++) {
        state.push(CreateEmptyCell());
    }

    return state;
};

export const simulateStep = (cells: Cell[], boardWidth: number): Cell[] => {
    let newCells: Cell[] = [];

    for (let cellNum = 0; cellNum < cells.length; cellNum++) {
        let newCell = simulateCell(cells, boardWidth, cellNum);
        newCells.push(newCell);
    }

    return newCells;
};

export const simulateCell = (
    board: Cell[],
    boardWidth: number,
    cellNumber: number
): Cell => {
    let cell = board[cellNumber];

    // These first few checks are common to a lot of cells, so instead of
    // handling them all seperately, handle them here.
    if (checkFireIgnition(board, cell, boardWidth, cellNumber)) {
        return CreateFireCell();
    }

    if (checkVolcanoIgnition(board, cell, boardWidth, cellNumber)) {
        return CreateFireCell();
    }

    switch (cell.type) {
        case "empty":
            return simulateEmpty(board, cell, boardWidth, cellNumber);
        case "tree":
            return simulateTree(board, cell, boardWidth, cellNumber);
        case "fire":
            return simulateFire(board, cell, boardWidth, cellNumber);
        case "ash":
            return simulateAsh(board, cell, boardWidth, cellNumber);
        case "mountain":
            return simulateMountain(board, cell, boardWidth, cellNumber);
        case "water":
            return simulateWater(board, cell, boardWidth, cellNumber);
        case "volcano":
            return simulateVolcano(board, cell, boardWidth, cellNumber);
        case "rabbit":
            return simulateRabbit(board, cell, boardWidth, cellNumber);
        case "fox":
            return simulateFox(board, cell, boardWidth, cellNumber);
    }

    // If none of the simulators whats to do anyting with the cell, just return the original one
    return cell;
};

export const checkFireIgnition = (
    board: Cell[],
    cell: Cell,
    boardWidth: number,
    cellNumber: number
): boolean => {
    if (!instanceOfLivingCell(cell)) {
        return false;
    }

    if (!cell.burnable) {
        return false;
    }

    let neighboursR1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let fireNeighbours = countType(neighboursR1, "fire");

    return fireNeighbours > 0;
};

export const checkVolcanoIgnition = (
    board: Cell[],
    cell: Cell,
    boardWidth: number,
    cellNumber: number
): boolean => {
    if (!instanceOfLivingCell(cell)) {
        return false;
    }

    if (!cell.burnable) {
        return false;
    }

    let neighboursR1 = getCellNeighbours(board, boardWidth, cellNumber, 1);
    let volcanoNeighbours = countType(neighboursR1, "volcano");

    return volcanoNeighbours > 0;
};
