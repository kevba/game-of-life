import React, { useEffect, useState } from 'react';
import { simulateStep, emptyBoardState } from './boardstate';
import { GameField } from './gameField';
import { Typography, Divider, Button } from '@material-ui/core';

const STEP_INTERVAL = 750

export const GameContainer = (): React.ReactElement => {
    const [step, setStep] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [boardState, setBoardState] = useState(emptyBoardState())

    const nextStep = () => {
        setStep(step+1)
        
        const newState = simulateStep(boardState)
        setBoardState(newState)
    }

    useEffect(() => {
        let timer = null
        
        if (isRunning) {
            timer = setTimeout(() => nextStep(), STEP_INTERVAL);
        }
    
        return () => clearTimeout(timer);
    }, [isRunning, boardState]);

    const handleStartStop = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        setBoardState(emptyBoardState())
        setStep(0)
    }

    const handleCellClick = (row: number, col: number) => {
        if (isRunning) {
            return
        }

        let currentBoardState = [...boardState]

        if (boardState[row][col] === 1) {
            currentBoardState[row][col] = 0
        } else {
            currentBoardState[row][col] = 1
        }

        setBoardState(currentBoardState)
    }

    return (
        <React.Fragment>
            <Typography variant={"h3"}> Game of life </Typography>
            <Typography variant={"subtitle1"}> Step {step} </Typography>
            <Divider />
            <GameField boardState={boardState} onCellClick={handleCellClick}/>
            <Button onClick={handleStartStop}>
                {!isRunning ? "Start" : "Pause"}
            </Button>
            <Button onClick={handleReset}>
                Reset
            </Button>
        </React.Fragment>
    )
}