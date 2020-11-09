import React, { useContext, useEffect, useMemo } from 'react';
import { Cell } from './cell';
import { makeStyles } from '@material-ui/core';
import { BoardContext } from './index';
import { ICell } from './boardstate';
import { CellContainer } from './cellContainer';

interface IRowProps {
    rowNumber: number;
    rowCells: ICell[];
}

const useStyles = makeStyles({
    row: {
        display: "flex",
        flexWrap: "nowrap",
        maxWidth: "70vh",
    },
})

export const Row = (props: IRowProps): React.ReactElement => {
    const {rowNumber, rowCells} = props

    const classes = useStyles()

    const cells = useMemo((): React.ReactElement[] => {
        let cells: React.ReactElement[] = []
        let width = rowCells.length
        let cellNumOffset = rowNumber*width
    
        for (let i = 0; i<width; i++) {
            let cellNum = i+cellNumOffset
            cells.push(
                <CellContainer
                    key={`cell_${cellNum}`}
                    cellNumber={cellNum} />
            )
        }

        return cells
    }, [rowNumber, rowCells])

    return (
        <div className={classes.row}>
            {cells}
        </div>
    )
}