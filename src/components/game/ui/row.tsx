import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import { CellContainer } from './cell/cellContainer';
import { Cell } from '../logic/cells';

interface IRowProps {
    rowNumber: number;
    rowCells: Cell[];
    allowOverwrite: boolean;
}

const useStyles = makeStyles({
    row: {
        display: "flex",
        flexWrap: "nowrap",
    },
})

export const Row = (props: IRowProps): React.ReactElement => {
    const {rowNumber, rowCells, allowOverwrite} = props
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
                    cell={rowCells[i]}
                    allowOverwrite={allowOverwrite} />
            )
        }

        return cells
    }, [rowNumber, JSON.stringify(rowCells)])

    return (
        <div className={classes.row}>
            {cells}
        </div>
    )
}