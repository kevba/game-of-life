import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { ICell } from './boardstate';
import { cellAction } from './clickActions';

interface ICellProps {
    cell: ICell;
    cellNum: number;
    onClick: (cellNum: number, action: cellAction) => void;
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
    const {onClick, cell, cellNum} = props
    const classes = useStyles(props)

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {        
        if (e.buttons === 1)  {
            onClick(cellNum, cellAction.Create)
        }

        if (e.buttons === 2) {
            onClick(cellNum, cellAction.Erase)
        }
    }

    const handleClick = () => {
        if (!cell.alive)  {
            onClick(cellNum, cellAction.Create)
        } else{
            onClick(cellNum, cellAction.Erase)
        }
    }

    useEffect(() => {
        console.log("onCLikc has chagned somehow");
    }, [onClick])

    // useEffect(() => {
    //     console.log("cell has changed somehow");
    // }, [cell])

    // useEffect(() => {
    //     console.log("cellNum has changed somehow");
    // }, [cellNum])

    return (
        <div
            className={classes.root}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            onContextMenu={(e) => e.preventDefault()}>
            <svg viewBox={"0 0 15 10"} className={classes.cell}>
                <text x={"0"} y={"10"} >
                    {cell.alive ? `${cell.icon}` : ""}
                </text>
            </svg>
        </div>
    )
}