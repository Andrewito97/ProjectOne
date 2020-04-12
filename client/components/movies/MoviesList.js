import React from 'react';
import Movie from './Movie';
import NewMovieForm from './NewMovieForm';
import authenticationHelper from '../../helpers/authentication.helper';
import movieApi from '../../api/movie.api';
import DummyVideo from './DummyMovie';

const MoviesList = () => {
    const [ movies, setMovies ] = React.useState([]);
    const [ shouldUpdate, setUpdate ] = React.useState(false);
    const [ dummyData, setDummyData ] = React.useState(true);

    React.useEffect(() => {
        loadMovies();
        if(shouldUpdate) {
            loadMovies();
        }
    }, []);

    const loadMovies = async () => {
        setDummyData(true)
        const data = await movieApi.list();
        if(data.error) {
            console.log(data.error);
        } else {
            setDummyData(false);
            setMovies(data);
        };
    };

    const updateList = (movie) => {
        const updatedMovies = movies;
        updatedMovies.unshift(movie);
        setMovies(updatedMovies);
        setUpdate(!shouldUpdate);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewMovieForm addVideo={updateList}/>) : null}
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