import React from 'react';
import { Board } from './boardstate';
import { Cell } from './cell';
import { makeStyles } from '@material-ui/core';
import { cellAction } from './clikcActions';

interface IGameFieldProps {
    board: Board,
    onCellClick: (cellNum: number, action: cellAction) => void
}

const useStyles = makeStyles({
    row: {
        display: "flex",
        flexWrap: "nowrap",
        maxWidth: "70vh",
    },
})


export const GameField = (props: IGameFieldProps): React.ReactElement => {
    const {board, onCellClick} = props

    const classes = useStyles()

    const renderCells = (rowNum: number): React.ReactElement[] => {
        let cells: React.ReactElement[] =[]
        let cellNumOffset = rowNum*board.width
    
        for (let i = 0; i<board.width; i++) {
            let cellNum = i+cellNumOffset
            cells.push(
                <Cell
                    key={`cell_${cellNum}`}
                    cell={board.state[cellNum]}
                    onClick={(action) => onCellClick(cellNum, action)}/>
            )
        }

        return cells
    }

    const renderRows = ():React.ReactElement[] => {
        let rows: React.ReactElement[] = []

        for (let rowNum = 0; rowNum<board.width; rowNum++) {
            rows.push(
                <div key={`row_${rowNum}`} className={classes.row}>
                    {renderCells(rowNum)}
                </div>
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