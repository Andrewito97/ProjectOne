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
        let isSubscribed = true;
        if(isSubscribed) {
            loadMovies();
        };
        return () => isSubscribed = false;
    }, [skip]);

    const loadMovies = async () => {
        const data = await movieApi.listMovies(skip);
        if(data.error) {
            console.log(data.error);
        } else {
            setMovies([...movies, ...data]);
            if(data.length === 0) {
                setShouldLoadMore(false);
            };
        };
    };

    if(movies.length === 0) {
        loadMovies(); //initial loading
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