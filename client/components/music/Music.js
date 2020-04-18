import React from 'react';
import ReactPlayer from 'react-player';
import { Card, 
         CardContent, 
         CardHeader,
         Typography } from '@material-ui/core';

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
                    {
                    props.music.audios.map((name, index) => (
                        <div key={index}>
                            <audio controls>
                                <source src={'/myapi/music/audios/' + name} />
                            </audio>
                        </div>
                        )      
                    )
                    }
                    {/* <ReactPlayer 
                        url={'/myapi/music/' + props.song._id}
                        controls
                    /> */}
                    <Typography style={styles.songDate}>
                        {new Date(props.music.created).toDateString()}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Music;