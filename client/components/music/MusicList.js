import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCookies } from 'react-cookie';
import Music from './Music';
import NewMusicForm from './NewMusicForm';
import MusicGenreSelect from './MusicGenreSelect';
import DummyMusic from './DummyMusic';
import authenticationHelper from '../../helpers/authentication.helper';
import musicApi from '../../api/music.api';

const styles = {
	container: {
		position: 'relative'
	},
	selectContainer: {
		position: 'absolute', 
		top: -60, 
		width: '100%'
	}
};

const MusicList = () => {
	const [ music, setMusic ] = React.useState([]);
	const [ genre, setGenre ] = React.useState('All');
	const [ skip, setSkip ] = React.useState(0);
	const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);
	const [ cookies, setCookie ] = useCookies(['OneProjectMusic']);

	React.useEffect(() => {
		const controller = new window.AbortController();
		const signal = controller.signal;
		if(cookies.OneProjectMusic) {
			setGenre(cookies.OneProjectMusic);
			loadMusic(cookies.OneProjectMusic, signal);
		} else {
			setGenre('All');
			loadMusic('All', signal);
		}
		return function cleanup() {
			controller.abort();
		};
	}, [skip]);

	const loadMusic = async (genre, signal) => {
		let data = await musicApi.listMusic(genre, skip, signal);
		if(data === undefined) return;
		if(data.error) {
			console.log(data.error);
		} 
		else {
			setMusic([...music, ...data]);
			if(data.length === 0) {
				setShouldLoadMore(false);
			}
		}
	};

	const updateMusicList = (item) => {
		let updatedMusic = [...music];
		updatedMusic.unshift(item);
		setMusic(updatedMusic);
	};

	const handleChange = (event) => {
		setMusic('');
		setGenre(event.target.value);
		setCookie('OneProjectMusic', event.target.value);
		location.reload();
	};

	return (
		<div style={styles.container}>
			{authenticationHelper.isAuthenticated() ? (<NewMusicForm updateMusicList={updateMusicList}/>) : null}
			<div style={styles.selectContainer}>
				<MusicGenreSelect value={genre} handleChange={handleChange}/>
			</div>
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
