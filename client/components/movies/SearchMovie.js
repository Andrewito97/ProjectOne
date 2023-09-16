import React from 'react';
import { Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Movie from './Movie';
import movieApi from '../../api/movie.api';
import DummyMovie from './DummyMovie';

const styles = {
  container: {
    width: 850,
    minHeight: '110vh',
    marginTop: '10%',
    marginBottom: '7%'
  }
};

const SearchMovie = () => {
  const [ movie, setMovie ] = React.useState([]);

  const { movieId } = useParams();

  React.useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    let data = await movieApi.findMovie(movieId);
    if(data.error) {
      console.log(data.error);
    } else {
      setMovie(data);
    }
  };

  return (
    <Box style={styles.container}>
      { movie.length === 0 ? <DummyMovie/> : <Movie movie={movie}/> }
    </Box>
  );
};

export default SearchMovie;
