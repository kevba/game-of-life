import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { AppHeader } from './AppHeader';
import { AppContent } from './AppContent';

export const App = (): React.ReactElement => {
    return (
        <React.Fragment>
            <CssBaseline />
            <AppHeader />
            <AppContent />
        </React.Fragment>   
    )
}