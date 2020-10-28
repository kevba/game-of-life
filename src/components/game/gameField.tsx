import React from 'react';
import { Board, ICell } from './boardstate';
import { Row } from './row';

interface IGameFieldProps {
    board: Board,
    onCellClick: (row: number, col: number) => void
}

export const GameField = (props: IGameFieldProps): React.ReactElement => {
    const {board, onCellClick} = props

    const renderRows = ():React.ReactElement[] => {
        let rows: React.ReactElement[] = []

        for (let rowNum = 0; rowNum<board.width; rowNum++) {
            let rowCells: ICell[] = board.state.slice(rowNum*board.width, (rowNum+1)*board.width)

            rows.push(
                <Row key={rowNum} row={rowCells} onCellClick={(col: number) => onCellClick(rowNum, col)}/>
            )
        }
    
        return rows
    }

    return (
        <div>
            {renderRows()}
        </div>
    )
}