import React from 'react';
import { AppBar,
  Box,
  Tabs,
  Tab,
  Backdrop,
  CircularProgress } from '@material-ui/core';
import Post from '../posts/Post';
import Music from '../music/Music';
import Movie from '../movies/Movie';
import Book from '../books/Book';
import postApi from '../../api/post.api';
import musicApi from '../../api/music.api';
import movieApi from '../../api/movie.api';
import bookApi from '../../api/book.api';
import authenticationHelper from '../../helpers/authentication.helper';
import paletteController from '../../PaletteController';
import SuccessWindow from '../SuccessWindow';

const styles = {
  tabs: {
    color: 'white'
  },
  container: {
    width: 850
  },
  backdrop: {
    zIndex: 20
  }
};

const ProfileTabs = () => {
  const [ value, setValue ] = React.useState(0);
  const [ posts, setPosts ] = React.useState([]);
  const [ music, setMusic ] = React.useState([]);
  const [ movies, setMovies ] = React.useState([]);
  const [ books, setBooks ] = React.useState([]);
  const [ successed, setSuccessed ] = React.useState(false);
  const [ isLoading, setLoading ] = React.useState(false);

  React.useEffect( () => {
    let isSubscribed = true;
    if(isSubscribed) {
      loadData();
    }
    return () => isSubscribed = false;
  }, []);

  const loadData = async () => {
    const userId = authenticationHelper.isAuthenticated().user._id;
    const userPosts = await postApi.getUserNewsFeed(userId);
    const userMusic = await musicApi.getUserMusic(userId);
    const userMovies = await movieApi.getUserMovies(userId);
    const userBooks = await bookApi.getUserBooks(userId);
    setPosts(userPosts);
    setMusic(userMusic);
    setMovies(userMovies);
    setBooks(userBooks);
  };

  const deletePost = async (postId) => {
    const data = await postApi.deletePost(postId);
    if(data.success) {
      const newPosts = updateList(posts, postId);
      setPosts(newPosts);
      setSuccessed(true);
    } else {
      console.log(data);
    }
  };

  const deleteMusic = async (musicId) => {
    setLoading(true);
    let musicPost;
    for(let item of music) {
      if(item._id === musicId) musicPost = item;
    }
    let audios = musicPost.audios;
    for(let audio of audios) {
      await musicApi.deleteAudio(musicId, audio);
    }
    const data = await musicApi.deleteMusic(musicId);
    if(data.success) {
      const newMusic = updateList(music, musicId);
      setMusic(newMusic);
      setLoading(false);
      setSuccessed(true);
    } else {
      console.log(data);
    }
  };

  const deleteMovie = async (movieId) => {
    setLoading(true);
    const videoData = await movieApi.deleteVideo(movieId);
    if(videoData.success) {
      const movieData = await movieApi.deleteMovie(movieId);
      if(movieData.success) {
        const newMovies = updateList(movies, movieId);
        setMovies(newMovies);
        setLoading(false);
        setSuccessed(true);
      } else {
        console.log(movieData);
      }
    } else {
      console.log(videoData);
    }
  };

  const deleteBook = async (bookId) => {
    const data = await bookApi.deleteBook(bookId);
    if(data.success) {
      const newBooks = updateList(books, bookId);
      setBooks(newBooks);
      setSuccessed(true);
    } else {
      console.log(data);
    }
  };

  const updateList = (items, itemId) => {
    const newItems = [...items];
    const index = newItems.findIndex(item => item._id === itemId);
    newItems.splice(index, 1);
    return newItems;
  };

  let dialogWindowValue = value === 0 ? 'Post' : value === 1 ? 'Music' : value === 2 ? 'Movie' : 'Book';

  return (
    <Box style={styles.container}>
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
        <Tab id='profile-newsfeed-tab' label='Main'/>
        <Tab id='profile-music-tab' label='Music'/>
        <Tab id='profile-movies-tab' label='Movies'/>
        <Tab id='profile-books-tab' label='Books'/>
      </Tabs>
      {
        value === 0 ? posts.map( item => (
          <Post 
            post={item} 
            key={item._id} 
            isProfile
            deletePost={deletePost}
          />
        ))
          :
          null
      }
      {
        value === 1 ? music.map( item => (
          <Music 
            music={item} 
            key={item._id} 
            isProfile
            deleteMusic={deleteMusic}
          />
        ))
          :
          null
      }
      {
        value === 2 ? movies.map( item => (
          <Movie 
            movie={item} 
            key={item._id} 
            isProfile
            deleteMovie={deleteMovie}
          />
        ))
          :
          null
      }
      {
        value === 3 ? books.map( item => (
          <Book
            book={item}
            key={item._id}
            isProfile
            deleteBook={deleteBook}
          />
        ))
          :
          null
      }
      <SuccessWindow
        open={successed}
        message={`${dialogWindowValue} successfully deleted`}
        onClick={() => setSuccessed(false)}
      />
      <Backdrop open={isLoading} style={styles.backdrop} >
        <CircularProgress style={{ color: paletteController.backgroundColor }} size={150} thickness={4}/>
      </Backdrop>
    </Box>
  );
};

export default ProfileTabs;
