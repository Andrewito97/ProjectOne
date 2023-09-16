/* eslint-disable react/prop-types */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { isMobile } from 'react-device-detect';
import breaks from 'remark-breaks';
import ReactPlayer from 'react-player';
import { Card, 
  CardContent, 
  CardHeader,
  Box,
  Typography,
  IconButton,
  Button,
  Collapse } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import addWhitespaces from '../../helpers/addWhitespaces.helper';
import paletteController from '../../PaletteController';
import ConfirmWindow from '../ConfirmWindow';

const styles = {
  card: {
    marginBottom: 60,
    paddingTop: 37,
    paddingBottom: 37
  },
  video: {
    width: '100%',
    height: 380,
    marginTop: 30,
    backgroundColor: 'black'
  },
  movieFooter: {
    position: 'relative',
    marginTop: 50
  },
  movieDate: {
    color: 'grey'
  },
  deleteIcon: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    color: 'white'
  }
};

const Movie = (props) => {
  const [ confirm, setConfirm ] = React.useState(false);
  const [ opened, setOpened ] = React.useState(false);

  const description = addWhitespaces(props.movie.description);

  return (
    <Box>
      <Card
        raised
        style={{
          backgroundColor: paletteController.cardColor,
          paddingLeft: isMobile ? 0 : 50,
          paddingRight: isMobile ? 0 : 50,
          ...styles.card
        }}
      >
        <CardHeader
          title={<Box id='movie-title'>{props.movie.title}</Box>}
          subheader={<Box id='movie-genre'>{props.movie.genre}</Box>}
          style={{
            marginLeft: isMobile ? 20 : null,
            marginRight: isMobile ? 20 : null,
            color: paletteController.textColor,
          }}
        />
        <CardContent 
          style={{
            paddingLeft: isMobile ? 0 : null,
            paddingRight: isMobile ? 0 : null
          }}
        >
          <Box
            style={{
              marginLeft: isMobile ? 20 : null,
              marginRight: isMobile ? 20 : null
            }}
          >
            {
              description.length < 1000 ?
                <Typography 
                  id='movie-description'
                  component='span'
                  style={{
                    color: paletteController.textColor
                  }}
                >
                  <ReactMarkdown source={description} plugins={[breaks]}/>  
                </Typography>
                :
                <Box>
                  <Collapse in={opened} collapsedHeight={230}>
                    <Typography 
                      id='movie-description'
                      component='span'
                      style={{
                        color: paletteController.textColor
                      }}
                    >
                      <ReactMarkdown source={description} plugins={[breaks]}/>  
                    </Typography>
                  </Collapse>
                  <Button 
                    onClick={() => setOpened(!opened)}
                    style={{color: paletteController.textColor}}	
                  >
                    {opened ? 'Collapse...' : 'View more...'}
                  </Button>
                </Box>
            }
          </Box>
          <Box id='movie-video'>
            <ReactPlayer
              url={'/myapi/movies/video/' + props.movie._id} 
              width={styles.video.width}
              height={styles.video.height}
              style={styles.video}
              controls
            />
          </Box>
          <Box 
            style={{
              marginLeft: isMobile ? 20 : null,
              marginRight: isMobile ? 20 : null,
              ...styles.movieFooter
            }}
          >
            <Typography id='movie-date' style={styles.movieDate}>
              {new Date(props.movie.created).toDateString()}
            </Typography>
            { 
              props.isProfile ? 
                <IconButton
                  id='delete-movie-button'
                  onClick={() => setConfirm(true)}
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
          </Box>
        </CardContent>
      </Card>
      <ConfirmWindow
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={() => props.deleteMovie(props.movie._id)}
        title='Delete Movie confirmation'
      />
    </Box>
  );
};

export default Movie;
