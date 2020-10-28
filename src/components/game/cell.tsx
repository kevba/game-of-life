import { makeStyles } from '@material-ui/core';
import React from 'react';

interface ICellProps {
    cellValue: number,
    boardSize: number,
    onClick: () => void
}

const useStyles = makeStyles({
    root: (props: ICellProps) => ({
        position: "relative",
        flexBasis: `calc(100%/${props.boardSize})`,
        border: "1px solid",
        boxSizing: "border-box",
        backgroundColor: props.cellValue === 1 ? "black" : "white",

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
    const {onClick} = props
    const classes = useStyles(props)


    return (
        <div className={classes.root} onClick={onClick}>
            <div className={classes.cell} />
        </div>
    )
}