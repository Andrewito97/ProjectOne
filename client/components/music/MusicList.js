import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Music from './Music';
import NewMusicForm from './NewMusicForm';
import authenticationHelper from '../../helpers/authentication.helper';
import musicApi from '../../api/music.api';
import DummyMusic from './DummyMusic';

const MusicList = () => {
    const [ music, setMusic ] = React.useState([]);
    const [ skip, setSkip ] = React.useState(0);
    const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);

    React.useEffect(() => {
        const controller = new window.AbortController();
        const signal = controller.signal;
        loadMusic(signal);
        return function cleanup() {
            controller.abort();
        };
    }, [skip]);

    const loadMusic = async (signal) => {
        let data = await musicApi.listMusic(skip, signal);
        if(data === undefined) return
        if(data.error) {
            console.log(data.error);
        } 
        else {
            setMusic([...music, ...data]);
            if(data.length === 0) {
                setShouldLoadMore(false);
            };
        };
    };

    const updateMusicList = (item) => {
        let updatedMusic = [...music];
        updatedMusic.unshift(item);
        setMusic(updatedMusic);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewMusicForm updateMusicList={updateMusicList}/>) : null}
            <InfiniteScroll
                dataLength={music.length}
                hasMore={shouldLoadMore}
                next={() => setSkip(music.length)}
            >
                { music.length === 0 ? <DummyMusic/> : music.map( (item, index) => <Music music={item} key={index}/> ) }
            </InfiniteScroll>
        </div>
    );
};

export default MusicList;
