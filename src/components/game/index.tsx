import React, { useState } from 'react';
import { Board, ICell, simulateStep } from './boardstate';
import { Game } from './game';

const DEFAULT_WIDTH = 20

export const GameContainer = (): React.ReactElement => {
    const [board, setBoard] = useState(new Board(DEFAULT_WIDTH))
    const [currentStep, setCurrentStep] = useState(0)

    const handleSetBoardWidth = (width: number) => {
        if (width > 1) {
            let newBoard = new Board(width)
            setBoard(newBoard)
        }
    }

    const handleResetBoard = () => {
        setCurrentStep(0)

        let newBoard = new Board(board.width)
        setBoard(newBoard)
    }  

    const handleSetCell = (cellNum: number, cell: ICell) => {
        let newState = [...board.state]
        newState[cellNum] = cell

        let newBoard = {
            width: board.width,
            state: newState
        }
    
        setBoard(newBoard)
    }

    const handleNextStep = () => {
        setCurrentStep(currentStep+1)

        let newBoard = simulateStep(board)
        setBoard(newBoard)
    }

    return (
        <Game
            board={board}
            setBoardSize={handleSetBoardWidth}
            resetBoard={handleResetBoard}
            setCell={handleSetCell}
            nextStep={handleNextStep}
            currentStep={currentStep} 
        />
    )
}