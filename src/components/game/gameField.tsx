import { TableCell, Table, TableBody, TableRow } from '@material-ui/core';
import React from 'react';
import { boardState } from './boardstate';
import { Cell } from './cell';

interface IGameFieldProps {
    boardState: boardState
}

export const GameField = (props: IGameFieldProps): React.ReactElement => {
    const {boardState} = props

    const renderRows = ():React.ReactElement[] => {
        return boardState.map((row: number[], index: number) => {
            return (
                <TableRow key={index}>
                    {renderCells(row)}
                </TableRow>
            )
        })
    }

    const renderCells = (row: number[]): React.ReactElement[] => {
        return row.map((cell: number, index: number) => {
            return (
                <Cell key={index} cellValue={cell} />
            )
        })
    }

    return (
        <Table>
            <TableBody>
                {renderRows()}
            </TableBody>
        </Table>
    )
}