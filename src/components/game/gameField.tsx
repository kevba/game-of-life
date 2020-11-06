import React, { useCallback } from 'react';
import { Board } from './boardstate';

import { makeStyles } from '@material-ui/core';
import { cellAction } from './clickActions';
import { Row } from './row';

interface IGameFieldProps {
    board: Board,
    onCellClick: (cellNum: number, action: cellAction) => void
}


export const GameField = (props: IGameFieldProps): React.ReactElement => {
    const {board, onCellClick} = props

    const handleCellClick = useCallback((cellNum: number, action: cellAction) => {
        onCellClick(cellNum, action)
    }, [onCellClick])

    const renderRows = ():React.ReactElement[] => {
        let rows: React.ReactElement[] = []

        for (let rowNum = 0; rowNum<board.width; rowNum++) {
            let rowStart = rowNum*(board.width)
            let rowEnd = rowStart+board.width
        
            let row = board.state.slice(rowStart, rowEnd)
            
            rows.push(
                <Row key={rowNum} rowNum={rowNum} row={row} onCellClick={handleCellClick} />
            )
        }
    
        return rows
    }

    return (
        <div>
            {renderRows()}
        </div>
    )
}