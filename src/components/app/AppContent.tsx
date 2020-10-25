import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import { GameContainer } from '../game'

export const AppContent = (): React.ReactElement => {
    return (
        <Grid container justify={"center"} alignItems={"stretch"}>
            <Grid item xs={10} md={6}>
                <Paper>
                    <GameContainer />
                </Paper>
            </Grid>
        </Grid>
    )
}