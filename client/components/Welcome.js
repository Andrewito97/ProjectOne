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
                    Hi! This is the platform for populization 
                    ukrainian media and intelectual products. 
                    I hope you can find here something 
                    interesting for you. Also you can share
                    this content by yourself - write to the
                    support to agree details
                    </i>
                </Typography>
                <img src={ukraineImage} style={styles.image}/>
            </CardContent>
        </Card>
    )
}

export default Welcome;
