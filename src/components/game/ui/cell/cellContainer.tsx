import React, { useCallback, useContext, useEffect } from 'react';
import { cellAction } from '../clickActions';
import { Cell } from '../../logic/cells';
import { CellDisplay } from './cell';
import { CreateEmptyCell } from '../../logic/cells/types/empty';
import { BoardDispatch } from '../../boardReducer';

interface ICellContainerProps {
    cell: Cell
    cellNumber: number
    allowOverwrite: boolean
}

export const CellContainer = (props: ICellContainerProps): React.ReactElement => {
    const {cell, cellNumber, allowOverwrite} = props
    const boardDispatch = useContext(BoardDispatch)

    const updateCell = useCallback((action: cellAction) => {
        switch(action) {
            case cellAction.Create:
                if (allowOverwrite || cell.type === "empty") {
                    boardDispatch({type: "updateCellType", cellNumber: cellNumber})
                }

                break
            case cellAction.Erase:
                boardDispatch({type: "setCell", cellNumber: cellNumber, cell: {...CreateEmptyCell()}})
                break
        }
    }, [cell, cellNumber, allowOverwrite])

    return (
        <CellDisplay
            updateCell={updateCell}
            cell={cell} />
    )
}