import React, { useContext, useEffect, useState } from 'react'
import { Typography, Button, Grid, Checkbox, FormControlLabel } from '@material-ui/core'
import { BoardContext, BoardDispatch } from '../boardReducer'
import { CellTypeTemplates } from '../logic/cells/index'
import { Canvas } from './canvas'

const DEFAULT_SPEED = 200
const MAX_SPEED = 10
const SPEED_STEP_SIZE = 10

interface IGameProps {
    setBoardSize: (size: number) => void
    resetBoard: () => void
    nextStep: () => void
    currentStep: number
}

export const Game = (props: IGameProps): React.ReactElement => {
    const { setBoardSize, resetBoard, nextStep, currentStep } = props

    const [isRunning, setIsRunning] = useState(false)
    const [speed, setSpeed] = useState(DEFAULT_SPEED)

    const boardContext = useContext(BoardContext)
    const boardDispatch = useContext(BoardDispatch)

    useEffect(() => {
        let timer = null

        if (isRunning) {
            timer = setTimeout(() => nextStep(), speed)
        }

        return () => clearTimeout(timer)
    }, [isRunning, speed, boardContext])

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

        setBoardSize(boardContext.width + 1)
    }

    const handleDecreaseBoardSize = () => {
        if (isRunning) {
            return
        }

        setBoardSize(boardContext.width - 1)
    }

    const renderBoardSizeControls = (): React.ReactElement => {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={'subtitle1'}> Boardsize {boardContext.width} </Typography>
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

    const renderStepSpeedControls = (): React.ReactElement => {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={'subtitle1'}> Step Speed {speed}ms </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => handleSetSpeed(speed + SPEED_STEP_SIZE)}>
                        +
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => handleSetSpeed(speed - SPEED_STEP_SIZE)}>
                        -
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const renderStepControls = (): React.ReactElement => {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={'subtitle1'}> Step {currentStep} </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleStartStop}>
                        {!isRunning ? 'Start' : 'Pause'}
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

    const renderCellTypeSelectControls = (): React.ReactElement => {
        let cellButtons: React.ReactElement[] = []
        for (let cell of CellTypeTemplates) {
            let isSelectedType = cell.type === boardContext.cellType.type

            cellButtons.push(
                <Grid key={cell.type} item xs={4}>
                    <Button
                        variant={isSelectedType ? 'contained' : 'outlined'}
                        onClick={() => boardDispatch({ type: 'setCellType', cell: cell })}
                        color={isSelectedType ? 'primary' : undefined}>
                        {cell.icon}
                    </Button>
                </Grid>
            )
        }

        return (
            <Grid container direction={'row'}>
                <Grid item xs={12}>
                    <Typography variant={'subtitle1'}> Set cell type </Typography>
                </Grid>
                {cellButtons}
            </Grid>
        )
    }

    const renderControls = (): React.ReactElement => {
        return (
            <Grid container direction={'column'} justify={'flex-start'} alignContent={'space-around'}>
                <Grid item xs={12}>
                    {renderStepControls()}
                </Grid>
                <Grid item xs={12}>
                    {renderBoardSizeControls()}
                </Grid>
                <Grid item xs={12}>
                    {renderStepSpeedControls()}
                </Grid>
                <Grid item xs={12}>
                    {renderCellTypeSelectControls()}
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container justify={'center'}>
            <Grid item xs={12}>
                <Typography variant={'h3'}> Game of life </Typography>
            </Grid>

            <Grid item xs={2}>
                {renderControls()}
            </Grid>

            <Grid item xs={10}>
                <Canvas />
            </Grid>
        </Grid>
    )
}
