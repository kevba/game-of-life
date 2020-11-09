import React, { useCallback, useContext } from 'react';
import { cellAction } from './clickActions';
import { BoardDispatch, BoardContext } from './index';
import { Cell } from './cell';

interface ICellContainerProps {
    cellNumber: number;
}

export const CellContainer = (props: ICellContainerProps): React.ReactElement => {
    const {cellNumber} = props
    const dispatch = useContext(BoardDispatch)
    const {cells} = useContext(BoardContext)

    const updateCell = useCallback((action: cellAction) => {
        switch(action) {
            case cellAction.Create:
                dispatch({type: "setCell", cellNumber: cellNumber, cell: {...cells[cellNumber], alive: true}})
                break
            case cellAction.Erase:
                dispatch({type: "setCell", cellNumber: cellNumber, cell: {...cells[cellNumber], alive: false}})
                break
        }
    }, [cells, cellNumber])

    return (
        <Cell
            updateCell={updateCell}
            cell={cells[cellNumber]} />
    )
}