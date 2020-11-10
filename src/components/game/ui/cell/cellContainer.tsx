import React, { useCallback, useContext } from 'react';
import { cellAction } from '../clickActions';
import { BoardDispatch } from '../../index';
import { ICell } from '../../logic/cells';
import { Cell } from './cell';
import { CreateTreeCell } from '../../logic/cells/tree';
import { CreateEmptyCell } from '../../logic/cells/empty';

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
                dispatch({type: "setCell", cellNumber: cellNumber, cell: {...CreateTreeCell()}})
                break
            case cellAction.Erase:
                dispatch({type: "setCell", cellNumber: cellNumber, cell: {...CreateEmptyCell()}})
                break
        }
    }, [cell, cellNumber])

    return (
        <Cell
            updateCell={updateCell}
            cell={cell} />
    )
}