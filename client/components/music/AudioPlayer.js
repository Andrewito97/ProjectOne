/* eslint-disable react/prop-types */
import React from 'react';
import { isMobile } from 'react-device-detect';
import '../style.css';
import { Typography,
	Button,
	Box,
	LinearProgress,
	Slider } from '@material-ui/core';
import ReactPlayer from 'react-player';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import paletteController from '../../PaletteController';

const styles = {
	audioContainer: {
		display: 'flex',
		width: '100%',
		maxWidth: 700
	},
	playButton: {
		height: 34,
		color: 'white'
	},
	volumeButton: {
		height: 34,
		color: 'white'
	},
	playRail: {
		position: 'relative',
		width: '80%'
	},
	playProgress:{
		height: 34, 
		width: '100%',
		borderRadius: 4
	},
	timePlayed: {
		position: 'absolute',
		zIndex: 5,
		left: 8,
		top: 8
	},
	timeDuration: {
		position: 'absolute',
		zIndex: 5,
		right: 8,
		top: 8
	},
	rangeInput: {
		position: 'absolute',
		width: '100%', 
		zIndex: 10,
		top: -1,
		left: -1
	},
	volumeSliderContainer: {
		width: 90,
		position: 'relative',
		borderRadius: 4
	},
	volumeSlider:{
		position: 'absolute',
		backgroundColor: 'transparent',
		color: 'white',
		width: '67%',
		left: 10
	}
};

const AudioPlayer = (props) => {
	const [ playing, setPlaying ] = React.useState(false);
	const [ played, setPlayed ] = React.useState(0);
	const [ displayVolume, setDisplayVolume ] = React.useState('none');
	const [ volume, setVolume ] = React.useState(0.5);
	const [ muted, setMuted ] = React.useState(false);
	const [ duration, setDuration ] = React.useState();

	let player;

	const onPlaying = () => {
		setPlaying(!playing);
	};

	const onProgress = (progress) => {
		if(playing) {
			setPlayed(progress.played);
		}
		if(progress.played === 1) {
			setPlaying(false);
		}
	};

	const onSeekChange = (event) => {
		if(event.button === 2) return; //don't change on right click
		setPlayed(parseFloat(event.target.value));
	};

	const onSeekMouseDown = (event) => {
		if(event.button === 2) return;
		setPlaying(false);
	};

	const onSeekMouseUp = (event) => {
		if(event.button === 2) return;
		setPlaying(true);
		player.seekTo(parseFloat(event.target.value));
	};

	const handleVolume = (event, value) => {
		if(event.buttons === 2) return;
		if(value === 0) {
			setMuted(true);
			setVolume(value);
		} else {
			setMuted(false);
			setVolume(value);
		}
	};

	const handleMuted = () => {
		if(isMobile) return;
		setMuted(!muted);
		setVolume(0);
	};

	const formateTime = (time) => {
		const date = new Date(time * 1000);
		const minutes = date.getUTCMinutes();
		const seconds = ('0' + date.getUTCSeconds()).slice(-2);
		return `${minutes}:${seconds}`;
	};

	return (
		<Box style={{marginBottom: 20}}>
			<Typography
				id='audio-name'
				style={{
					color: paletteController.textColor
				}}
			>
				{props.name}
			</Typography>
			<ReactPlayer
				ref={ (reference) => player = reference }
				url={ '/myapi/music/audios/' + props.name }
				playing={playing}
				muted={muted}
				volume={volume}
				height={0}
				onProgress={onProgress}
				onDuration={(value) => setDuration(value)}
			/>
			<Box style={styles.audioContainer}>
				<Button
					id='play-pause-button'
					onClick={onPlaying}
					style={{
						backgroundColor: paletteController.mainColor,
						...styles.playButton
					}}
				>
					{
						playing ? <PauseIcon/> : <PlayArrowIcon/>
					}
				</Button>
				<Box style={styles.playRail}>
					<LinearProgress 
						variant='determinate' 
						value={played * 100} 
						style={styles.playProgress} 
					/>

					<time 
						dateTime={`P${Math.round(duration * played)}S`}
						style={{
							color: paletteController.textColor,
							...styles.timePlayed
						}}
					>
						<Typography>
							{formateTime(duration * played)}
						</Typography>
					</time>

					<time 
						dateTime={`P${Math.round(duration)}S`}
						style={{
							color: paletteController.textColor,
							...styles.timeDuration
						}}
					>
						<Typography>
							{formateTime(duration)}
						</Typography>    
					</time>

					<input
						type='range'
						style={styles.rangeInput} 
						value={played}
						min={0}
						max={1}
						step='any'
						onMouseDown={onSeekMouseDown}
						onChange={onSeekChange}
						onMouseUp={onSeekMouseUp}

						//mobile events
						onTouchStart={onSeekMouseDown}
						onTouchMove={onSeekChange}
						onTouchEnd={onSeekMouseUp}
					/>
				</Box>
				<Box
					onMouseEnter={() => setDisplayVolume('block')}
					onMouseLeave={() => setDisplayVolume('none')}
					style={{
						display: displayVolume, 
						backgroundColor: paletteController.mainColor,
						...styles.volumeSliderContainer
					}}
				>
					<Slider
						onChange={handleVolume}
						value={volume}
						min={0}
						max={1}
						step={0.01}
						style={{
							top: isMobile ? -3 : 5,
							...styles.volumeSlider
						}}
					/>
				</Box>
				<Button
					id='audio-volume-button'
					onClick={handleMuted}
					onMouseEnter={() => setDisplayVolume('block')}
					onMouseLeave={() => setDisplayVolume('none')}

					//mobile events
					onTouchStart={() => {
						if(displayVolume === 'none') {
							setDisplayVolume('block');
						} else {
							setDisplayVolume('none');
						}	
					}}
					onTouchCancel={() => setDisplayVolume('none')}
					style={{
						backgroundColor: paletteController.mainColor,
						...styles.volumeButton
					}}
				>
					{
						muted ? <VolumeOffIcon/> : <VolumeUpIcon/>
					}
				</Button>
			</Box>
		</Box>
	);
};

export default AudioPlayer;
