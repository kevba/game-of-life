import React, { useContext, useMemo } from 'react';

import { Row } from './row';
import { makeStyles } from '@material-ui/core';
import { BoardContext } from '../boardReducer';

const useStyles = makeStyles({
    root: {
        border: "2px solid",
        boxSizing: "border-box",
        borderColor: "#c0c0c0",
        maxWidth: "70vh",
    }
})

export const GameField = (): React.ReactElement => {
    const {cells, width, overwrite} = useContext(BoardContext)

    const classes = useStyles()

    const rows = useMemo((): React.ReactElement[] => {
        let rows: React.ReactElement[] = []

        for (let rowNum = 0; rowNum<width; rowNum++) {
            let rowStart = rowNum*width
            let rowEnd = rowStart+width
            let rowCells = cells.slice(rowStart, rowEnd)
            
            rows.push(
                <Row key={`row_${rowNum}`} rowNumber={rowNum} rowCells={rowCells} allowOverwrite={overwrite}/>
            )
        }

        return rows
    }, [overwrite, JSON.stringify(cells)])

    return (
        <div className={classes.root}>
            {rows}
        </div>
    )
}