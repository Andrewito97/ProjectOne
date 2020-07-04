import React from 'react';
import { Card, 
        CardContent, 
        CardHeader,
        Typography } from '@material-ui/core';
import PaletteSelect from './PaletteSelect';
import paletteController from '../PaletteController';
import ukraineImage from '../assets/ukraine.png';

const styles = {
    card: {
        width: '100%',
        padding: 17,
        marginBottom: 30
    },
    text: {
        marginBottom: 40
    },
    image: {
        width: '100%'
    }
}

const AboutUs = () => {
    return (
        <Card 
            style={{
                backgroundColor: paletteController.cardColor,
                ...styles.card
            }}
        >
            <CardHeader
                title='About us'
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
                    I want to popularize ukrainian culture - 
                    movies, music and intellectual efforts in general. 
                    You can sendyour feedback on my gmail - 
                    gandriy123wf@gmail.com
                    </i>
                </Typography>
                <img src={ukraineImage} style={styles.image}/>
            </CardContent>
        </Card>
    )
}

export default AboutUs;
