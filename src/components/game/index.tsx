import React, { useReducer, useState, useCallback } from 'react'
import { Game } from './ui/game'
import { BoardContext, BoardDispatch, BoardReducer, defaultBoard } from './boardReducer'

export const GameContainer = (): React.ReactElement => {
    const [currentStep, setCurrentStep] = useState(0)

    const [board, dispatchBoard] = useReducer(BoardReducer, defaultBoard)

    const handleSetBoardWidth = useCallback((width: number) => {
        if (width > 1) {
            dispatchBoard({ type: 'setWidth', width: width })
        }
    }, [])

    const handleResetBoard = () => {
        setCurrentStep(0)
        dispatchBoard({ type: 'reset' })
    }

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
        dispatchBoard({ type: 'simulateStep' })
    }

    return (
        <BoardContext.Provider value={board}>
            <BoardDispatch.Provider value={dispatchBoard}>
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
