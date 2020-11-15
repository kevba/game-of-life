import React, { useCallback, useContext, useEffect } from 'react';
import { cellAction } from '../clickActions';
import { Cell } from '../../logic/cells';
import { CellDisplay } from './cell';
import { CreateEmptyCell } from '../../logic/cells/types/empty';
import { BoardDispatch } from '../../boardReducer';
import { CellControlContext } from '../../cellControlReducer';

interface ICellContainerProps {
    cell: Cell
    cellNumber: number
}

export const CellContainer = (props: ICellContainerProps): React.ReactElement => {
    const {cell, cellNumber} = props
    const boardDispatch = useContext(BoardDispatch)
    const cellControlContext = useContext(CellControlContext)

    const updateCell = useCallback((action: cellAction) => {        
        switch(action) {
            case cellAction.Create:
                boardDispatch({type: "setCell", cellNumber: cellNumber, cell: {...cellControlContext.cell}})
                break
            case cellAction.Erase:
                boardDispatch({type: "setCell", cellNumber: cellNumber, cell: {...CreateEmptyCell()}})
                break
        }
    }, [cell, cellNumber, cellControlContext.cell.type])

    return (
        <CellDisplay
            updateCell={updateCell}
            cell={cell} />
    )
}