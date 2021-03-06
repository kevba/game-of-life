import { Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { GameContainer } from '../game'

const useStyles = makeStyles({
    root: {
        padding: '1em 2em 1em 2em',
        margin: '2em',
    },
})

export const AppContent = (): React.ReactElement => {
    const classes = useStyles()

    return (
        <Grid container justify={'center'} alignItems={'stretch'}>
            <Grid item xs={12} md={10} lg={10}>
                <Paper className={classes.root}>
                    <GameContainer />
                </Paper>
            </Grid>
        </Grid>
    )
}
