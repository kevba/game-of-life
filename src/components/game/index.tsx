import React, { useReducer, useState, useCallback } from 'react';
import { Game } from './ui/game';
import { BoardContext, BoardDispatch, boardReducer, defaultBoard } from './boardReducer';
import { CellControlContext, CellControlDispatch, cellControlReducer, defaultCellControl } from './cellControlReducer';

export const GameContainer = (): React.ReactElement => {
    const [currentStep, setCurrentStep] = useState(0)

    const [board, dispatchBoard] = useReducer(boardReducer, defaultBoard)

    const [cellControl, dispatchCellControl] = useReducer(cellControlReducer, defaultCellControl)
    
    const handleSetBoardWidth = useCallback((width: number) => {
        if (width > 1) {
            dispatchBoard({type: 'setWidth', width: width})
        }
    }, [])

    const handleResetBoard = () => {
        setCurrentStep(0)
        dispatchBoard({type: 'reset'})
    }

    const handleNextStep = () => {
        setCurrentStep(currentStep+1)
        dispatchBoard({type: 'simulateStep'})
    }

    return (
        <BoardContext.Provider value={board}>
            <BoardDispatch.Provider value={dispatchBoard}>
                <CellControlContext.Provider value={cellControl}>
                    <CellControlDispatch.Provider value={dispatchCellControl}>
                        <Game
                            setBoardSize={handleSetBoardWidth}
                            resetBoard={handleResetBoard}
                            nextStep={handleNextStep}
                            currentStep={currentStep} 
                        />
                    </CellControlDispatch.Provider>
                </CellControlContext.Provider>
            </BoardDispatch.Provider>
        </BoardContext.Provider>
    )
}