import React from 'react';
import { Card, 
        CardContent, 
        Typography } from '@material-ui/core';
import PaletteSelect from './PaletteSelect';
import styleController from '../StyleController';

const styles = {
    card: {
        width: '100%',
        padding: 17,
    },
    text: {
        marginTop: 35
    }
}

const RightSidebar = (props) => {
    return (
        <Card 
            style={{
                backgroundColor: styleController.cardColor,
                ...styles.card
            }}
        >
            <CardContent>
                <PaletteSelect palette={props.palette} setPalette={props.setPalette}/>
                <Typography 
                    style={{
                        color: styleController.textColor,
                        ...styles.text
                    }}
                >
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RightSidebar;