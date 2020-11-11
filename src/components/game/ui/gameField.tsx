import React, { useContext, useMemo } from 'react';

import { Row } from './row';
import { BoardContext } from '../index';

export const GameField = (): React.ReactElement => {
    const {cells, width} = useContext(BoardContext)

    const rows = useMemo((): React.ReactElement[] => {
        let rows: React.ReactElement[] = []

        for (let rowNum = 0; rowNum<width; rowNum++) {
            let rowStart = rowNum*width
            let rowEnd = rowStart+width
            let rowCells = cells.slice(rowStart, rowEnd)
            
            rows.push(
                <Row key={`row_${rowNum}`} rowNumber={rowNum} rowCells={rowCells} />
            )
        }

        return rows
    }, [JSON.stringify(cells)])

    return (
        <div>
            {rows}
        </div>
    )
}