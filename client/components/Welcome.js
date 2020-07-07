import React from 'react';
import { Card, 
        CardContent, 
        CardHeader,
        Typography } from '@material-ui/core';
import paletteController from '../PaletteController';
import ukraineImage from '../assets/ukraine.png';

const styles = {
    card: {
        marginBottom: 30,
        padding: 20
    },
    text: {
        marginBottom: 40
    },
    image: {
        width: '100%'
    }
}

const Welcome = () => {
    return (
        <Card 
            style={{
                backgroundColor: paletteController.cardColor,
                ...styles.card
            }}
        >
            <CardHeader
                title='Welcome!'
                style={{
                    color: paletteController.textColor
                }}
            />
            <CardContent>
                <Typography 
                    style={{
                        color: paletteController.textColor,
                        ...styles.text
                    }}
                >
                    <i>
                    Glag to see you here! This is the place of ukrainian
                    media and intelectual products. The main goal -
                    populization of the content for people who wants to understand
                    better this culture or who doesn't know at all. Hope you will
                    have a great time here!
                    </i>
                </Typography>
                <img src={ukraineImage} style={styles.image}/>
            </CardContent>
        </Card>
    )
}

export default Welcome;
