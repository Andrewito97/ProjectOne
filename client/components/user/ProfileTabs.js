import React from 'react';
import { AppBar, 
         Tabs, 
         Tab,
         Button,
         Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions } from '@material-ui/core';
import Post from '../posts/Post';
import Music from '../music/Music';
import Movie from '../movies/Movie';
import postApi from '../../api/post.api';
import musicApi from '../../api/music.api';
import movieApi from '../../api/movie.api';
import authenticationHelper from '../../helpers/authentication.helper';
import paletteController from '../../PaletteController';

const styles = {
    tabs: {
        color: 'white'
    },
    okButton: {
        color: 'white',
        marginTop: 60
    }
};

const ProfileTabs = () => {
    const [ value, setValue ] = React.useState(0);
    const [ posts, setPosts ] = React.useState([]);
    const [ music, setMusic ] = React.useState([]);
    const [ movies, setMovies ] = React.useState([]);
    const [successedPost, setSuccessedPost ] = React.useState(false);
    const [successedMusic, setSuccessedMusic ] = React.useState(false);
    const [successedMovie, setSuccessedMovie ] = React.useState(false);

    React.useEffect( () => {
        loadData();
    }, []);

    const loadData = async () => {
        const userId = authenticationHelper.isAuthenticated().user._id
        const userPosts = await postApi.getUserNewsFeed(userId);
        const userMusic = await musicApi.getUserMusic(userId);
        const userMovies = await movieApi.getUserMovies(userId);
        setPosts(userPosts);
        setMusic(userMusic);
        setMovies(userMovies);
    };

    const deletePost = async (postId) => {
        const data = await postApi.deletePost(postId);
        if(data.success) {
            setSuccessedPost(true);
        } else {
            console.log(data)
        };
    };

    const deleteMusic = async (musicId) => {
        let musicPost;
        for(let item of music) {
            if(item._id === musicId) musicPost = item;
        };
        let audios = musicPost.audios;
        for(let audio of audios) {
            await musicApi.deleteAudio(audio)
        };
        const data = await musicApi.deleteMusic(musicId);
        if(data.success) {
            setSuccessedMusic(true);
        } else {
            console.log(data)
        };
    };

    const deleteMovie = async (movieId) => {
        const videoData = await movieApi.deleteVideo(movieId);
        if(videoData.success) {
            const movieData = await movieApi.deleteMovie(movieId);
            if(movieData.success) {
                setSuccessedMovie(true);
            } else {
                console.log(movieData);
            };
        } else {
            console.log(videoData);
        };
    };

    let dialogWindowBoolean = value === 0 ? successedPost : value === 1 ? successedMusic : successedMovie;
    let dialogWindowValue = value === 0 ? 'Post' : value === 1 ? 'Music' : 'Movie';

    return (
        <div>
            <AppBar/>
            <Tabs
                onChange={ (event, newValue) => setValue(newValue) }
                value={value}
                centered={true}
                style={{
                    backgroundColor: paletteController.mainColor,
                    ...styles.tabs
                }}
                
            >
                <Tab label='Posts'/>
                <Tab label='Music'/>
                <Tab label='Movies'/>
            </Tabs>
            {
                value === 0 ? posts.map( (item, index) => (
                    <Post 
                        post={item} 
                        key={index} 
                        isProfile
                        deletePost={deletePost}
                    />
                ))
                :
                null
            }
            {
                value === 1 ? music.map( (item, index) => (
                    <Music 
                        music={item} 
                        key={index} 
                        isProfile
                        deleteMusic={deleteMusic}
                    />
                ))
                :
                null
            }
            {
                value === 2 ? movies.map( (item, index) => (
                    <Movie 
                        movie={item} 
                        key={index} 
                        isProfile
                        deleteMovie={deleteMovie}
                    />
                ))
                :
                null
            }
             <Dialog open={dialogWindowBoolean} disableBackdropClick={true}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogWindowValue} successfully deleted
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={ () => location.reload() }
                        style={{
                            backgroundColor: paletteController.mainColor,
                            ...styles.okButton
                        }}
                        
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ProfileTabs;
