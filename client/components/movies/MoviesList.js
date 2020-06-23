import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Movie from './Movie';
import NewMovieForm from './NewMovieForm';
import authenticationHelper from '../../helpers/authentication.helper';
import movieApi from '../../api/movie.api';
import DummyMovie from './DummyMovie';

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
        const data = await movieApi.listMovies(skip, signal);
        if(data.error) {
            console.log(data.error);
        } else {
            setMovies([...movies, ...data]);
            if(data.length === 0) {
                setShouldLoadMore(false);
            };
        };
    };

    const updateMoviesList = (item) => {
        let updatedMovies = [...movies];
        updatedMovies.unshift(item);
        setMovies(updatedMovies);
    };

    return (
        <InfiniteScroll
            dataLength={movies.length}
            hasMore={shouldLoadMore}
            next={() => setSkip(movies.length)}
        >
            {authenticationHelper.isAuthenticated() ? (<NewMovieForm updateMoviesList={updateMoviesList}/>) : null}
            <div>
                { movies.length === 0 ? <DummyMovie/> : movies.map( (item, index) => <Movie movie={item} key={index}/> ) }
            </div>
        </InfiniteScroll>
    );
};

export default MoviesList;
