import { makeStyles } from '@material-ui/core';
import React from 'react';

interface ICellProps {
    cellValue: number,
    onClick: () => void
}

const useStyles = makeStyles({
    root: (props: ICellProps) => ({
        width: "2em",
        height: "2em",
        borderStyle: "solid",
        borderWidth: "1px",
        backgroundColor: props.cellValue === 1 ? "black" : "white"
    }),
})

export const Cell = (props: ICellProps): React.ReactElement => {
    const {onClick} = props
    const classes = useStyles(props)


    return (
        <div className={classes.root} onClick={onClick}/>
    )
}