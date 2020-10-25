import React, { useEffect, useState } from 'react';
import { initialBoardState, simulateStep } from './boardstate';
import { GameField } from './gameField';
import { Typography, Divider, Button } from '@material-ui/core';

const SIMULATION_TIME_SECONDS = 500

export const GameContainer = (): React.ReactElement => {
    const [step, setStep] = useState(0)
    const [boardState, setBoardState] = useState(initialBoardState())

    const nextStep = () => {
        setStep(step+1)
        console.log(step);
        
        const newState = simulateStep(boardState)
        setBoardState(newState)
    }

    useEffect(() => {
        const timer = setInterval(() => nextStep(), SIMULATION_TIME_SECONDS);
        return () => clearInterval(timer);
    }, [nextStep]);


    return (
        <React.Fragment>
            <Typography variant={"h3"}> Game of life </Typography>
            <Divider />
            <GameField boardState={boardState} />
            <Button onClick={() => setBoardState(initialBoardState())}>
                Reset
            </Button>
        </React.Fragment>
    )
}