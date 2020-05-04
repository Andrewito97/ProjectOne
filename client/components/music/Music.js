import React from 'react';
import AudioPlayer from './AudioPlayer';
import { Card, 
         CardContent, 
         CardHeader,
         Typography,
         IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    song: {
        marginBottom: 60
    },
    container: {
        padding: 37
    },
    video: {
        width: '100%',
        minHeight: 420,
        marginTop: 30,
        backgroundColor: 'black'
    },
    songDate: {
        color: 'grey',
        marginTop: 50
    },
    deleteIcon: {
        backgroundColor: '#2D986D',
        color: 'white'
    }
};

const Music = (props) => {
    return (
        <div style={styles.song}>
            <Card style={styles.container}>
                <CardHeader
                    title={props.music.author}
                    subheader={props.music.genre}
                />
                <CardContent>
                { props.music.audios.map((name, index) => <AudioPlayer key={index} name={name}/>) }
                    <Typography style={styles.songDate}>
                        {new Date(props.music.created).toDateString()}
                    </Typography>
                    { 
                        props.isProfile ? 
                        <IconButton
                            style={styles.deleteIcon}
                            onClick={ () => props.deleteMusic(props.music._id) }
                        >
                            <DeleteIcon/>
                        </IconButton>
                        : 
                        null 
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default Music;
