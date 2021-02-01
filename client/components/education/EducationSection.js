import React from 'react';
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Box,
	Card,
	CardHeader,
	CardContent,
	Typography,
	TextField,
	IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmWindow from '../ConfirmWindow';
import educationApi from '../../api/education.api';
import getUserStatus from '../../helpers/getUserStatus.helper';
import SuccessWindow from '../SuccessWindow';
import addWhitespaces from '../../helpers/addWhitespaces.helper';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	},
	card: {
		marginBottom: 60,
		paddingTop: 37,
		paddingBottom: 37,
		minHeight: 500
	},
	titleField: {
		width: '96%',
		marginLeft: 15
	},
	textField: {
		width: '100%'
	},
	icons: {
		color: 'white',
		marginRight: 10,
		marginTop: 30
	}
};

const EducationSection = () => {
	const [ isModer, setIsModer ] = React.useState(false);
	const [ shouldEdit, setShouldEdit ] = React.useState(false);
	const [ title, setTitle ] = React.useState('');
	const [ text, setText ] = React.useState('');
	const [ titleError, setTitleError ] = React.useState('');
	const [ textError, setTextError ] = React.useState('');
	const [ confirm, setConfirm ] = React.useState(false);
	const [ successed, setSuccessed ] = React.useState(false);

	const { sectionName } = useParams();

	React.useEffect( () => {
		if(getUserStatus() !== 'user') setIsModer(true);
		loadSection();
	}, []);

	const loadSection = async () => {
		let section = await educationApi.getDocument(sectionName);
		setTitle(section.title);
		setText(section.text);
	};

	const updateSection = async () => {
		const data = await educationApi.update(sectionName, { title: title, text: text } );
		if(data && data.success) {
			setTitleError('');
			setTextError('');
			setShouldEdit(false);
		} else {
			data.error.errors.title ? 
				setTitleError(data.error.errors.title.properties.message) : setTitleError('');
			data.error.errors.text ? 
				setTextError(data.error.errors.text.properties.message) : setTextError('');
		}

		if(title !== sectionName) {
			location.replace('/education');
		}
	};

	const deleteSection = async () => {
		const data = await educationApi.delete(sectionName);
		if(data.success) {
			location.replace('/education');
			setSuccessed(true);
		} else {
			console.log(data);
		}
	};

	return (
		<Box style={styles.container}>
			<Card 
				raised
				style={{
					backgroundColor: paletteController.cardColor,
					paddingLeft: isMobile ? 5 : 50,
					paddingRight: isMobile ? 5 : 50,
					...styles.card
				}}
			>
				<Box
					style={{
						marginLeft: isMobile ? 20 : null,
						marginRight: isMobile ? 20 : null
					}}
				>
					{
						shouldEdit ?
							<TextField
								id='section-title-field'
								variant='outlined'
								defaultValue={title}
								style={styles.titleField}
								onChange={ (event) => setTitle(event.target.value) }
							/>
							:
							<CardHeader
								id='section-title'
								title={title}
								style={{color: paletteController.textColor}}
							/>
					}

					{ titleError ? (<Typography id='title-error' color='error'>{titleError}</Typography>) : null }
				</Box>

				<CardContent>
					{
						shouldEdit ? 
							<TextField
								id='section-text-field'
								variant='outlined'
								defaultValue={text}
								multiline
								rows='12'
								style={styles.textField}
								onChange={ (event) => setText(event.target.value) }
							/>
							:
							<Typography id='section-text' component='span' style={{ color: paletteController.textColor }}>
								<ReactMarkdown source={addWhitespaces(text)} plugins={[breaks]}/>
							</Typography>
					}

					{ textError ? (<Typography id='text-error' color='error'>{textError}</Typography>) : null }

					{
						isModer ?
							<Box>	
								{       
									shouldEdit ? 
										<IconButton
											id='save-section-button'
											size='small'
											onClick={updateSection} 
											style={{
												backgroundColor: paletteController.mainColor,
												...styles.icons
											}}
										>
											<SaveIcon/>
										</IconButton>
										:
										<IconButton
											id='edit-section-button'
											size='small'
											onClick={() => setShouldEdit(true)} 
											style={{
												backgroundColor: paletteController.mainColor,
												...styles.icons
											}}
										>
											<EditIcon/>
										</IconButton>
								}
				
								<IconButton
									id='delete-section-button'
									size='small'
									onClick={() => setConfirm(true)}
									style={{
										backgroundColor: paletteController.mainColor,
										...styles.icons
									}}
								>
									<DeleteIcon/>
								</IconButton>
							</Box>
							:
							null
					}

				</CardContent>
			</Card>
			<ConfirmWindow
				open={confirm}
				onCancel={() => setConfirm(false)}
				onConfirm={deleteSection}
				title='Delete section confirmation'
			/>
			<SuccessWindow
				open={successed}
				message='Section successfully deleted'
				onClick={() => setSuccessed(false)}
			/>
		</Box>
	);
};

export default EducationSection;
