import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import InfiniteScroll from 'react-infinite-scroll-component';
import Movie from './Movie';
import NewMovieForm from './NewMovieForm';
import authenticationHelper from '../../helpers/authentication.helper';
import movieApi from '../../api/movie.api';
import DummyMovie from './DummyMovie';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	},
};

const MoviesList = () => {
	const [ movies, setMovies ] = React.useState([]);
	const [ skip, setSkip ] = React.useState(0);
	const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);

	React.useEffect(() => {
		const controller = new window.AbortController();
		const signal = controller.signal;
		loadMovies(signal);
		return function cleanup() {
			controller.abort();
		};
	}, [skip]);

	const loadMovies = async (signal) => {
		let data = await movieApi.listMovies(skip, signal);
		if(data === undefined) return;
		if(data.error) {
			console.log(data.error);
		} else {
			setMovies([...movies, ...data]);
			if(data.length === 0) {
				setShouldLoadMore(false);
			}
		}
	};

	const updateMoviesList = (item) => {
		let updatedMovies = [...movies];
		updatedMovies.unshift(item);
		setMovies(updatedMovies);
	};

	return (
		<Box style={styles.container}>
			{authenticationHelper.isAuthenticated() ? (<NewMovieForm updateMoviesList={updateMoviesList}/>) : null}
			<InfiniteScroll
				dataLength={movies.length}
				hasMore={shouldLoadMore}
				next={() => setSkip(movies.length)}
				loader={
					<Typography variant='h5' align='center' style={{color: paletteController.textColor}}>
						Loading...
					</Typography>
				}
				style={{
					paddingRight: isMobile ? 0 : 10,
					paddingLeft: isMobile ? 0 : 10
				}}
			>
				{ movies.length === 0 ? <DummyMovie/> : movies.map( (item, index) => <Movie movie={item} key={index}/> ) }
			</InfiniteScroll>
		</Box>
	);
};

export default MoviesList;
