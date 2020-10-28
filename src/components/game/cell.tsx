import { makeStyles } from '@material-ui/core';
import React from 'react';
import { ICell } from './boardstate';

interface ICellProps {
    cell: ICell,
    boardSize: number,
    onClick: () => void
}

const useStyles = makeStyles({
    root: (props: ICellProps) => ({
        position: "relative",
        flexBasis: `calc(100%/${props.boardSize})`,
        border: "1px solid",
        boxSizing: "border-box",
        backgroundColor: props.cell.alive ? props.cell.color : "white",

        "&::before": {
            content: '""',
            display: "block",
            paddingTop: "100%",
        }
    }),

    cell: {
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
    }
})

export const Cell = (props: ICellProps): React.ReactElement => {
    const {onClick, cell} = props
    const classes = useStyles(props)


    return (
        <div className={classes.root} onClick={onClick}>
            <div className={classes.cell}>
                {`${cell.icon}`}
            </div>  
        </div>
    )
}