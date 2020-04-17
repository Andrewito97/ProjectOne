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
        const songsData = await songApi.listMusic();
        if(songsData.error) {
            console.log(songsData.error);
        } 
        else {
            setDummyData(false);
            setSongs(songsData);
        };
    };

    const updateMusicList = () => {
        setUpdate(!shouldUpdate);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewSongForm updateMusicList={updateMusicList}/>) : null}
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