import { emptyCells, simulateStep } from './logic/index'
import React from 'react'
import { Cell, CellType } from './logic/cells'
import { CreateTreeCell } from './logic/cells/types/tree'
import { randomCells } from './logic/boardgen'

export const DEFAULT_WIDTH = 40

export type BoardState = {
    cells: Cell[]
    width: number
    cellType: Cell
    enabledTypes: CellType[]
}

export type BoardAction =
    | { type: 'setCell'; cellNumber: number; cell: Cell }
    | { type: 'updateCellType'; cellNumber: number }
    | { type: 'setWidth'; width: number }
    | { type: 'simulateStep' }
    | { type: 'reset' }
    | { type: 'setCellType'; cell: Cell }
    | { type: 'enableCellType'; cellType: CellType; enabled: boolean }

export const defaultBoard: BoardState = {
    cells: randomCells(DEFAULT_WIDTH),
    width: DEFAULT_WIDTH,
    cellType: CreateTreeCell(),
    enabledTypes: ['tree', 'water'],
}

export const BoardReducer = (state: BoardState, action: BoardAction): BoardState => {
    switch (action.type) {
        case 'setCell':
            let newCells = [...state.cells]
            newCells[action.cellNumber] = action.cell

            return {
                ...state,
                cells: newCells,
            }
        case 'updateCellType':
            newCells = [...state.cells]
            newCells[action.cellNumber] = { ...state.cellType }

            return {
                ...state,
                cells: newCells,
            }
        case 'simulateStep':
            newCells = simulateStep(state.cells, state.width)
            return {
                ...state,
                cells: newCells,
            }
        case 'reset':
            return {
                ...state,
                cells: emptyCells(DEFAULT_WIDTH),
                width: DEFAULT_WIDTH,
            }
        case 'setWidth':
            return {
                ...state,
                cells: emptyCells(action.width),
                width: action.width,
            }
        case 'setCellType':
            return {
                ...state,
                cellType: { ...action.cell },
            }
        case 'enableCellType':
            let enabledTypes = [...state.enabledTypes]

            if (!action.enabled) {
                enabledTypes = state.enabledTypes.filter((c) => c !== action.cellType)
            } else {
                // Add the cell, and remove any duplicates
                enabledTypes.push(action.cellType)
                enabledTypes = [...new Set(enabledTypes)]
            }

            return {
                ...state,
                enabledTypes: enabledTypes,
            }
    }
}

export const BoardContext = React.createContext<BoardState>(null)
export const BoardDispatch = React.createContext<React.Dispatch<BoardAction>>(null)
