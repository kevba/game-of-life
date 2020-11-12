import { makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { cellAction } from '../clickActions';
import { Cell } from '../../logic/cells';

interface ICellProps {
    updateCell: (action: cellAction) => void;
    cell: Cell;
}

const useStyles = makeStyles({
    root: {
        position: "relative",
        flexBasis: `100%`,
        // border: "1px solid",
        // boxSizing: "border-box",
        // borderColor: "#c0c0c0",
        "&::before": {
            content: '""',
            display: "block",
            paddingTop: "100%",
        }
    },

    cell: {
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        content: "center",
        userSelect: "none",
    }
})

export const CellDisplay = (props: ICellProps): React.ReactElement => {
    const {cell, updateCell} = props
    const classes = useStyles(props)

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.buttons === 1)  {
            updateCell(cellAction.Create)
        } else if (e.buttons === 2) {
            updateCell(cellAction.Erase)
        }
    }, [updateCell])

    const handleClick = useCallback(() => {
        if (cell.type === "empty")  {
            updateCell(cellAction.Create)
        } else{
            updateCell(cellAction.Erase)
        }
    }, [updateCell, JSON.stringify(cell)])

    return (
        <div
            className={classes.root}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            onContextMenu={(e) => e.preventDefault()}>
            <svg viewBox={"0 0 15 10"} className={classes.cell}>
                <text x={"0"} y={"10"} >
                    {cell.icon}
                </text>
            </svg>
        </div>
    )
}