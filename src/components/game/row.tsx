import React, { useContext, useEffect, useMemo } from 'react';
import { Cell } from './cell/cell';
import { makeStyles } from '@material-ui/core';
import { BoardContext } from './index';
import { ICell } from './boardstate';
import { CellContainer } from './cell/cellContainer';

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
                    cellNumber={cellNum}
                    cell={rowCells[i]} />
            )
        }

        return cells
    }, [rowNumber, JSON.stringify(rowCells)])


    // useEffect(() => console.log("updated cells", [cells]))
    // useEffect(() => console.log("updated rowNumber", [rowNumber]))
    // useEffect(() => console.log("updated rowCells", [rowCells]))

    return (
        <div className={classes.row}>
            {cells}
        </div>
    )
}