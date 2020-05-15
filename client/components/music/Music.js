import React from 'react';
import AudioPlayer from './AudioPlayer';
import { Card, 
         CardContent, 
         CardHeader,
         Typography,
         IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import paletteController from '../../PaletteController';

const styles = {
    card: {
        marginBottom: 60,
        padding: 37
    },
    musicFooter: {
        position: 'relative',
        marginTop: 50
    },
    songDate: {
        color: 'grey',
    },
    deleteIcon: {
        position: 'absolute',
        right: 10,
        bottom: 0,
        color: 'white'
    }
};

const Music = (props) => {
    return (
        <Card 
            style={{
                backgroundColor: paletteController.cardColor,
                ...styles.card
            }}
        >
            <CardHeader
                title={props.music.author}
                subheader={props.music.genre}
                subheaderTypographyProps={{color: 'inherit'}}
                style={{
                    color: paletteController.textColor,
                }}
            />
            <CardContent>
            { props.music.audios.map((name, index) => <AudioPlayer key={index} name={name}/>) }
            <div style={styles.musicFooter}>
                <Typography style={styles.songDate}>
                    {new Date(props.music.created).toDateString()}
                </Typography>
                { 
                    props.isProfile ? 
                    <IconButton
                        onClick={ () => props.deleteMusic(props.music._id) }
                        style={{
                            backgroundColor: paletteController.mainColor,
                            ...styles.deleteIcon
                        }}
                    >
                        <DeleteIcon/>
                    </IconButton>
                    : 
                    null 
                }
            </div>
            </CardContent>
        </Card>
    );
};

export default Music;
