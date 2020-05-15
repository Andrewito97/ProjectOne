import React from 'react';
import '../style.css';
import { Typography,
         Button,
         LinearProgress } from '@material-ui/core';
import ReactPlayer from 'react-player';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const AudioPlayer = (props) => {
    const [ playing, setPlaying ] = React.useState(false);
    const [ played, setPlayed ] = React.useState(0);
    const [ loaded, setLoaded ] = React.useState(0);

    const onPlaying = () => {
        setPlaying(!playing)
    };

    const onProgress = (progress) => {
        setPlayed(progress.played);
        setLoaded(progress.loaded);
    };
    
    return (
        <div style={{marginBottom: 20}}>
            <Typography>{props.name}</Typography>
            <ReactPlayer
                url={'/myapi/music/audios/' + props.name}
                playing={playing}
                height={0}
                onProgress={onProgress}
            />
            <div>
                <Button 
                    onClick={onPlaying}>
                    {
                        playing ? <PauseIcon/> : <PlayArrowIcon/>
                    }
                </Button>
                <LinearProgress variant='buffer' value={played*100} valueBuffer={loaded*100}/>
            </div>
        </div>
    )
};

export default AudioPlayer;
