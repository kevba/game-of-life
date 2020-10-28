import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Cell } from './cell';

interface IRowProps {
    row: number[]
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

    const renderCells = (row: number[]): React.ReactElement[] => {
        return row.map((cellValue: number, column: number) => {
            return (
                <Cell key={column} boardSize={row.length} cellValue={cellValue} onClick={() => onCellClick(column)}/>
            )
        })
    }

    return (
        <div className={classes.root}>
            {renderCells(row)}
        </div>
    )
}