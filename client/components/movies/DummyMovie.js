import React from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import paletteController from '../../PaletteController';

const styles = {
  container: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  dummyDescription: {
    marginTop: 30,
    marginBottom: 30
  },
  dummyVideo: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dummyPlayIcon: {
    position: 'absolute',
    height: 80,
    width: 80,
    zIndex: 1
  }
};

const DummyMovie = () => {

  const fakeTitle = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={45} width='60%'/>; 

  const fakeGenre = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={40} width='35%'/>; 

  const fakeTextLine = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={27} width='100%'/>; 

  const fakeVideo = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={470} width='100%' variant='rect'/>; 

  return (
    <Box style={styles.container}>
      {fakeTitle}
      {fakeGenre}
      <Box style={styles.dummyDescription}>
        {fakeTextLine}
        {fakeTextLine}
        {fakeTextLine}
        {fakeTextLine}
        {fakeTextLine}
        {fakeTextLine}
      </Box>
      <Box style={styles.dummyVideo}>
        <PlayCircleOutlineIcon style={{color: paletteController.backgroundColor, ...styles.dummyPlayIcon}}/>
        {fakeVideo}
      </Box>
    </Box>
  );
};

export default DummyMovie;
