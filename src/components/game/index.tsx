import React, { useReducer, useState, useCallback } from 'react';
import { simulateStep, emptyCells } from './logic';
import { Game } from './ui/game';
import { ICell } from './logic/cells';

const DEFAULT_WIDTH = 20

type BoardState = {
    cells: ICell[];
    width: number
}

type BoardAction =
    | {type: 'setCell', cellNumber: number, cell: ICell}
    | {type: 'setWidth', width: number}
    | {type: 'simulateStep'}
    | {type: 'reset'};

const defaultBoard = {
    cells: emptyCells(DEFAULT_WIDTH),
    width: DEFAULT_WIDTH
}

const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
    switch(action.type) {
        case "setCell":                    
            let newCells = [...state.cells]
            newCells[action.cellNumber] = action.cell

            return {
                ...state,
                cells: newCells,
            }
        case "simulateStep":
            newCells = simulateStep(state.cells, state.width)
            return {
                ...state,
                cells: newCells,
            }
        case "reset":
            return {
                ...state,
                cells: emptyCells(DEFAULT_WIDTH),
                width: DEFAULT_WIDTH
            }
        case "setWidth":
            return {
                ...state,
                cells: emptyCells(action.width),
                width: action.width
            }
    
        }
}

export const BoardContext = React.createContext<BoardState>(null);
export const BoardDispatch = React.createContext<React.Dispatch<BoardAction>>(null);

export const GameContainer = (): React.ReactElement => {
    const [currentStep, setCurrentStep] = useState(0)

    const [board, dispatch] = useReducer(boardReducer, defaultBoard)
    
    const handleSetBoardWidth = useCallback((width: number) => {
        if (width > 1) {
            dispatch({type: 'setWidth', width: width})
        }
    }, [])

    const handleResetBoard = () => {
        setCurrentStep(0)
        dispatch({type: 'reset'})
    }

    const handleNextStep = () => {
        setCurrentStep(currentStep+1)
        dispatch({type: 'simulateStep'})
    }

    return (
        <BoardContext.Provider value={board}>
            <BoardDispatch.Provider value={dispatch}>
                <Game
                    setBoardSize={handleSetBoardWidth}
                    resetBoard={handleResetBoard}
                    nextStep={handleNextStep}
                    currentStep={currentStep} 
                />
            </BoardDispatch.Provider>
        </BoardContext.Provider>
    )
}