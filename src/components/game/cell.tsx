import { makeStyles } from '@material-ui/core';
import React from 'react';
import { ICell } from './boardstate';
import { cellAction } from './clikcActions';

interface ICellProps {
    cell: ICell;
    onClick: (action: cellAction) => void;
}

const useStyles = makeStyles({
    root: {
        position: "relative",
        flexBasis: `100%`,
        border: "1px solid",
        boxSizing: "border-box",

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

export const Cell = (props: ICellProps): React.ReactElement => {
    const {onClick, cell} = props
    const classes = useStyles(props)

    const handleMouseEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {        
        if (e.buttons === 1) {
            onClick(cellAction.Create)
        }

        if (e.buttons === 2) {
            onClick(cellAction.Erase)
        }
    }

    return (
        <div
            className={classes.root}
            onMouseEnter={handleMouseEvent}
            onClick={handleMouseEvent}
            onContextMenu={(e) => e.preventDefault()}>
            <svg viewBox={"0 0 15 10"} className={classes.cell}>
                <text x={"0"} y={"10"} >
                    {cell.alive ? `${cell.icon}` : ""}
                </text>
            </svg>
        </div>
    )
}