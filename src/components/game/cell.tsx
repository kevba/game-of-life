import { TableCell } from '@material-ui/core';
import React from 'react';

interface ICellProps {
    cellValue: number
}

export const Cell = (props: ICellProps): React.ReactElement => {
    const {cellValue} = props

    const cellColor = (): string => {
        if (cellValue > 0) {
            return "black"
        }

        return "white"
    }

    return (
        <TableCell align={"center"} size={"small"} padding={"none"} style={{backgroundColor: cellColor()}}>
            {cellValue}
        </TableCell>
)
}