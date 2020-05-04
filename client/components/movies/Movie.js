import React from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import ReactPlayer from 'react-player';
import { Card, 
         CardContent, 
         CardHeader,
         Typography,
         IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import addWhitespaces from '../../helpers/addWhitespaces.helper';

const styles = {
    movie: {
        marginBottom: 60
    },
    container: {
        padding: 37
    },
    video: {
        width: '100%',
        height: 420,
        marginTop: 30,
        backgroundColor: 'black'
    },
    movieDate: {
        color: 'grey',
        marginTop: 50
    },
    deleteIcon: {
        backgroundColor: '#2D986D',
        color: 'white'
    }
};

const Movie = (props) => {
    const description = addWhitespaces(props.movie.description);
    return (
        <div style={styles.movie}>
            <Card style={styles.container}>
                <CardHeader
                    title={props.movie.title}
                    subheader={props.movie.genre}
                />
                <CardContent>
                    <Typography component='span'>
                        <ReactMarkdown source={description} plugins={[breaks]}/>   
                    </Typography>
                    <ReactPlayer 
                        url={'/myapi/movies/' + props.movie._id} 
                        width={styles.video.width}
                        height={styles.video.height}
                        style={styles.video}
                        controls
                    />
                    <Typography style={styles.movieDate}>
                        {new Date(props.movie.created).toDateString()}
                    </Typography>
                    { 
                        props.isProfile ? 
                        <IconButton
                            style={styles.deleteIcon}
                            onClick={ () => props.deleteMovie(props.movie._id) }
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

export default Movie;
