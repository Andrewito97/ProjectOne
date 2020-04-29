import React from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import ReactPlayer from 'react-player';
import { Card, 
         CardContent, 
         CardHeader,
         Typography } from '@material-ui/core';
import addWhitespaces from '../../helpers/addWhitespaces';

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
                </CardContent>
            </Card>
        </div>
    );
};

export default Movie;
