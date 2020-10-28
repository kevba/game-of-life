import React, { useEffect, useState } from 'react';
import { simulateStep, emptyBoardState, Board } from './boardstate';
import { GameField } from './gameField';
import { Typography, Divider, Button, Grid } from '@material-ui/core';

const STEP_INTERVAL = 750

export const GameContainer = (): React.ReactElement => {
    const [step, setStep] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    const [boardSize, setBoardSize] = useState(20)
    const [board, setBoard] = useState<Board>(new Board(boardSize))

    const nextStep = () => {
        setStep(step+1)
        
        simulateStep(board)
    }

    // useEffect(() => {
    //     let timer = null
        
    //     if (isRunning) {
    //         timer = setTimeout(() => nextStep(), STEP_INTERVAL);
    //     }
    
    //     return () => clearTimeout(timer);
    // }, [isRunning, boardState]);

    const handleStartStop = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        setBoard(new Board(boardSize))
        setStep(0)
    }

    const handleCellClick = (row: number, col: number) => {
        if (isRunning) {
            return
        }
    
        let cell = board.get(row, col)
        cell.alive = !cell.alive 
        board.set(row, col, cell)
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
                <GameField board={board} onCellClick={handleCellClick}/>
            </Grid>

        </Grid>
    )
}