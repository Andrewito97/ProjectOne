import React from 'react';
import '../style.css';
import { Typography } from '@material-ui/core';

const AudioPlayer = (props) => {
    return (
        <div style={{marginBottom: 20}}>
            <Typography>{props.name}</Typography>
            <audio style={{marginTop: 5}} controls>
                <source src={'/myapi/music/audios/' + props.name}></source> 
            </audio>
        </div>
    )
};

export default AudioPlayer;
