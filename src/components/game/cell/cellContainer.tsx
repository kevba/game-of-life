import React, { useCallback, useContext } from 'react';
import { cellAction } from '../clickActions';
import { BoardDispatch } from '../index';
import { Cell } from './cell';

interface ICellContainerProps {
    cell: ICell
    cellNumber: number
}

export const CellContainer = (props: ICellContainerProps): React.ReactElement => {
    const {cell, cellNumber} = props
    const dispatch = useContext(BoardDispatch)

    const updateCell = useCallback((action: cellAction) => {
        switch(action) {
            case cellAction.Create:
                dispatch({type: "setCell", cellNumber: cellNumber, cell: {...cell, alive: true}})
                break
            case cellAction.Erase:
                dispatch({type: "setCell", cellNumber: cellNumber, cell: {...cell, alive: false}})
                break
        }
    }, [cell, cellNumber])

    return (
        <Cell
            updateCell={updateCell}
            cell={cell} />
    )
}