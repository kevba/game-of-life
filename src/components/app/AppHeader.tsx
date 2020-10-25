import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

export const AppHeader = (): React.ReactElement => {
    return (
        <AppBar position="static">
            <Toolbar>
                 <Typography variant="h6">
                    Game of life
                </Typography>
            </Toolbar>
        </AppBar>
    )
}