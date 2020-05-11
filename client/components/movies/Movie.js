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
import styleController from '../../StyleController';
import color from '@material-ui/core/colors/amber';

const styles = {
    card: {
        marginBottom: 60,
        padding: 37
    },
    video: {
        width: '100%',
        height: 420,
        marginTop: 30,
        backgroundColor: 'black'
    },
    movieFooter: {
        position: 'relative',
        marginTop: 50
    },
    movieDate: {
        color: 'grey',
    },
    deleteIcon: {
        position: 'absolute',
        right: 10,
        bottom: 0,
        color: 'white'
    }
};

const Movie = (props) => {
    const description = addWhitespaces(props.movie.description);
    return (
        <Card 
            style={{
                backgroundColor: styleController.cardColor,
                ...styles.card
            }}
        >
            <CardHeader
                title={props.movie.title}
                subheader={props.movie.genre}
                subheaderTypographyProps={{color: 'inherit'}}
                style={{
                    color: styleController.textColor,
                }}
            />
            <CardContent>
                <Typography 
                    component='span'
                    style={{
                        color: styleController.textColor
                    }}
                >
                    <ReactMarkdown source={description} plugins={[breaks]}/>   
                </Typography>
                <ReactPlayer 
                    url={'/myapi/movies/' + props.movie._id} 
                    width={styles.video.width}
                    height={styles.video.height}
                    style={styles.video}
                    controls
                />
                <div style={styles.movieFooter}>
                    <Typography style={styles.movieDate}>
                        {new Date(props.movie.created).toDateString()}
                    </Typography>
                    { 
                        props.isProfile ? 
                        <IconButton
                            onClick={ () => props.deleteMovie(props.movie._id) }
                            style={{
                                backgroundColor: styleController.mainColor,
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
    )
};

export default Movie;
