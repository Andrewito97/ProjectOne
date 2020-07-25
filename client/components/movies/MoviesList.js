import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Movie from './Movie';
import NewMovieForm from './NewMovieForm';
import authenticationHelper from '../../helpers/authentication.helper';
import movieApi from '../../api/movie.api';
import DummyMovie from './DummyMovie';

const styles = {
	infiniteScroll: {
		paddingRight: 10,
		paddingLeft: 10
	}
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
		<div>
			{authenticationHelper.isAuthenticated() ? (<NewMovieForm updateMoviesList={updateMoviesList}/>) : null}
			<InfiniteScroll
				dataLength={movies.length}
				hasMore={shouldLoadMore}
				next={() => setSkip(movies.length)}
				style={styles.infiniteScroll}
			>
				{ movies.length === 0 ? <DummyMovie/> : movies.map( (item, index) => <Movie movie={item} key={index}/> ) }
			</InfiniteScroll>
		</div>
	);
};

export default MoviesList;
