import React, { useEffect, useState } from 'react';
import { Board, ICell } from './boardstate';
import { GameField } from './gameField';
import { Typography, Divider, Button, Grid } from '@material-ui/core';
import { cellAction } from './clikcActions';

const STEP_INTERVAL = 750

interface IGameProps {
    board: Board;
    setBoardSize: (size: number) => void;
    resetBoard: () => void;
    
    setCell: (cellNum: number, cell: ICell) => void;

    nextStep: () => void;
    currentStep: number;
}

export const Game = (props: IGameProps): React.ReactElement => {
    const {board, setBoardSize, resetBoard, setCell, nextStep, currentStep} = props

    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let timer = null
        
        if (isRunning) {
            timer = setTimeout(() => nextStep(), STEP_INTERVAL);
        }
    
        return () => clearTimeout(timer);
    }, [isRunning, board]);

    const handleStartStop = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        resetBoard()
        setIsRunning(false)
    }

    const handleCellClick = (cellNum: number, action: cellAction) => {
        if (isRunning) {
            return
        }
        
        let cell = board.state[cellNum]

        if (action === cellAction.Create) {
            cell.alive = true 
        }

        if (action === cellAction.Erase) {
            cell.alive = false 
        }

        setCell(cellNum, cell)
    }

    const renderBoardSizeControls = ():React.ReactElement => {
        const size = board.width
    
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}> Boardsize {size} </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => setBoardSize(size+1)}>
                        +
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => setBoardSize(size-1)}>
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