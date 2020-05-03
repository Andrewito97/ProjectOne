import React from 'react';
import Movie from './Movie';
import NewMovieForm from './NewMovieForm';
import authenticationHelper from '../../helpers/authentication.helper';
import movieApi from '../../api/movie.api';
import DummyVideo from './DummyMovie';

const MoviesList = () => {
    const [ movies, setMovies ] = React.useState([]);
    const [ dummyData, setDummyData ] = React.useState(true);

    React.useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        setDummyData(true)
        const data = await movieApi.listMovies();
        if(data.error) {
            console.log(data.error);
        } else {
            setDummyData(false);
            setMovies(data);
        };
    };

    const updateMoviesList = (item) => {
        let updatedMovies = [...movies];
        updatedMovies.unshift(item);
        setMovies(updatedMovies);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewMovieForm updateMoviesList={updateMoviesList}/>) : null}
            <div>
                { 
                dummyData ? <DummyVideo/>    
                :
                movies.map( (item, index) => <Movie movie={item} key={index}/> )
                }
            </div>
        </div>
    );
};

export default MoviesList;