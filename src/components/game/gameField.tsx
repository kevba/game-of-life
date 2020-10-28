import React from 'react';
import { boardState } from './boardstate';
import { Row } from './row';

interface IGameFieldProps {
    boardState: boardState,
    onCellClick: (row: number, col: number) => void
}

export const GameField = (props: IGameFieldProps): React.ReactElement => {
    const {boardState, onCellClick} = props

    const renderRows = ():React.ReactElement[] => {
        return boardState.map((row: number[], rowNumber: number) => {
            return (
                <Row key={rowNumber} row={row} onCellClick={(col: number) => onCellClick(rowNumber, col)}/>
            )
        })
    }

    return (
        <div>
            {renderRows()}
        </div>
    )
}