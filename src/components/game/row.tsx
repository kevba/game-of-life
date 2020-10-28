import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Cell } from './cell';
import { ICell } from './boardstate';

interface IRowProps {
    row: ICell[]
    onCellClick: (col: number) => void
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "nowrap",
        maxWidth: "70vh",
    },
})

export const Row = (props: IRowProps): React.ReactElement => {
    const {row, onCellClick} = props
    const classes = useStyles()

    const renderCells = (): React.ReactElement[] => {
        return row.map((cellValue: ICell, column: number) => {
            return (
                <Cell key={column} boardSize={row.length} cell={cellValue} onClick={() => onCellClick(column)}/>
            )
        })
    }

    return (
        <div className={classes.root}>
            {renderCells()}
        </div>
    )
}