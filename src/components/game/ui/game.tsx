import React, {useContext, useEffect, useState } from 'react';
import { GameField } from './gameField';
import { Typography, Button, Grid } from '@material-ui/core';
import { BoardContext } from '../index';

const DEFAULT_SPEED = 500
const MAX_SPEED = 100
const SPEED_STEP_SIZE = 100

interface IGameProps {
    setBoardSize: (size: number) => void;    
    resetBoard: () => void;
    nextStep: () => void;
    currentStep: number;
}

export const Game = (props: IGameProps): React.ReactElement => {
    const {setBoardSize, resetBoard, nextStep, currentStep} = props
    
    const [isRunning, setIsRunning] = useState(false)
    const [speed, setSpeed] = useState(DEFAULT_SPEED)

    const board = useContext(BoardContext)

    useEffect(() => {
        let timer = null
        
        if (isRunning) {
            timer = setTimeout(() => nextStep(), speed);
        }
    
        return () => clearTimeout(timer);
    }, [isRunning, speed, board]);

    const handleSetSpeed = (speed: number) => {
        if (speed < MAX_SPEED) {
            speed = MAX_SPEED
        }

        setSpeed(speed)
    }

    const handleStartStop = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        resetBoard()
        setIsRunning(false)
    }

    const handleIncreaseBoardSize = () => {
        if (isRunning) {
            return
        }

        setBoardSize(board.width+1)
    }

    const handleDecreaseBoardSize = () => {
        if (isRunning) {
            return
        }

        setBoardSize(board.width-1)
    }

    const renderBoardSizeControls = ():React.ReactElement => {    
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}> Boardsize {board.width} </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => handleIncreaseBoardSize()}>
                        +
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => handleDecreaseBoardSize()}>
                            -
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const renderStepSpeedControls = ():React.ReactElement => {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}> Step Speed {speed}ms </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => handleSetSpeed(speed+SPEED_STEP_SIZE)}>
                        +
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => handleSetSpeed(speed-SPEED_STEP_SIZE)}>
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
                    <Typography variant={"subtitle1"}> Step {currentStep} </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleStartStop}>
                        {!isRunning ? "Start" : "Pause"}
                    </Button>
                    </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleReset}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const renderControls = (): React.ReactElement => {
        return (
            <Grid container direction={"column"} justify={"flex-start"} alignContent={"space-around"}>
                <Grid item xs={12}>
                    {renderStepControls()}
                </Grid>
                <Grid item xs={12}>
                    {renderBoardSizeControls()}
                </Grid>
                <Grid item xs={12}>
                    {renderStepSpeedControls()}
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
                <GameField />
            </Grid>

        </Grid>
    )
}