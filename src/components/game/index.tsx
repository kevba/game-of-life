import React, { useEffect, useState } from 'react';
import { simulateStep, emptyBoardState } from './boardstate';
import { GameField } from './gameField';
import { Typography, Divider, Button, Grid } from '@material-ui/core';

const STEP_INTERVAL = 750

export const GameContainer = (): React.ReactElement => {
    const [step, setStep] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    const [boardSize, setBoardSize] = useState(20)
    const [boardState, setBoardState] = useState(emptyBoardState(boardSize))

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

    useEffect(() => {
        setBoardState(emptyBoardState(boardSize))
    }, [boardSize, setBoardState])

    const handleStartStop = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        setBoardState(emptyBoardState(boardSize))
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

    const renderBoardSizeControls = ():React.ReactElement => {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}> Boardsize {boardSize} </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => setBoardSize(boardSize+1)}>
                        +
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => setBoardSize(boardSize-1)}>
                            -
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const renderStepControls = ():React.ReactElement => {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}> Step {step} </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleStartStop}>
                        {!isRunning ? "Start" : "Pause"}
                    </Button>
                    </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleReset}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const renderControls = (): React.ReactElement => {
        return (
            <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"}>
                <Grid item xs={12}>
                    {renderStepControls()}
                </Grid>
                <Divider />
                <Grid item xs={12}>
                    {renderBoardSizeControls()}
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container justify={"center"}>
            <Grid item xs={12}>
                <Typography variant={"h3"}> Game of life </Typography>
            </Grid>

            <Grid item xs={3}>
                {renderControls()}
            </Grid>
            
            <Grid item xs={9} >
                <GameField boardState={boardState} onCellClick={handleCellClick}/>
            </Grid>

        </Grid>
    )
}