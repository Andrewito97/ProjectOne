import React from 'react';
import { useParams } from 'react-router-dom';
import { AppBar, 
         Tabs, 
         Tab } from '@material-ui/core';
import Post from '../posts/Post';
import Music from '../music/Music';
import Movie from '../movies/Movie';
import postApi from '../../api/post.api';
import musicApi from '../../api/music.api';
import movieApi from '../../api/movie.api';

const styles = {

};

const ProfileTabs = () => {
    const [ value, setValue ] = React.useState(0);
    const [ posts, setPosts ] = React.useState([]);
    const [ music, setMusic ] = React.useState([]);
    const [ movies, setMovies ] = React.useState([]);

    let params = useParams();

    React.useEffect( () => {
        loadData();
    }, []);

    const loadData = async () => {
        const userPosts = await postApi.getUserNewsFeed(params.userId);
        const userMusic = await musicApi.getUserMusic(params.userId);
        const userMovies = await movieApi.getUserMovies(params.userId);
        setPosts(userPosts);
        setMusic(userMusic);
        setMovies(userMovies);
    };

    return (
        <div>
            <AppBar />
            <Tabs
                value={value}
                centered={true}
                onChange={ 
                    (event, newValue) => setValue(newValue)
                }
            >
                <Tab label='Posts'/>
                <Tab label='Music'/>
                <Tab label='Movies'/>
            </Tabs>
            { value === 0 ? posts.map( (item, index) => <Post post={item} key={index}/> ) : null}
            { value === 1 ? music.map( (item, index) => <Music music={item} key={index}/> ) : null}
            { value === 2 ? movies.map( (item, index) => <Movie movie={item} key={index}/> ) : null}
        </div>
    )
};

export default ProfileTabs;
