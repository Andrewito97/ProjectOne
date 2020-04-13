import React from 'react';
import Song from './Song';
import NewSongForm from './NewSongForm';
import authenticationHelper from '../../helpers/authentication.helper';
import songApi from '../../api/song.api';
import DummySong from './DummySong';

const MusicList = () => {
    const [ songs, setSongs ] = React.useState([]);
    const [ shouldUpdate, setUpdate ] = React.useState(false);
    const [ dummyData, setDummyData ] = React.useState(true);

    React.useEffect(() => {
        loadSongs();
        if(shouldUpdate) {
            loadSongs();
        }
    }, []);

    const loadSongs = async () => {
        setDummyData(true)
        const data = await songApi.list();
        if(data.error) {
            console.log(data.error);
        } else {
            setDummyData(false);
            setSongs(data);
        };
    };

    const updateList = (song) => {
        const updatedSongs = songs;
        updatedSongs.unshift(song);
        setSongs(updatedSongs);
        setUpdate(!shouldUpdate);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewSongForm addSong={updateList}/>) : null}
            <div>
                { 
                dummyData ? <DummySong/>    
                :
                songs.map( (item, index) => <Song song={item} key={index}/> )
                }
            </div>
        </div>
    );
};

export default MusicList;