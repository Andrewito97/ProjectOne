import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Box,
	Card,
	CardHeader,
	CardContent,
	Typography,
	TextField,
	IconButton,
	Button,
	Collapse } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import educationApi from '../../api/education.api';
import getUserStatus from '../../helpers/getUserStatus.helper';
import authenticationHelper from '../../helpers/authentication.helper';
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
	introductionField: {
		width: '100%'
	},
	categoriesList: {
		display: 'flex',
		flexWrap: 'wrap',
		alignContent: 'space-around',
		marginTop: 30
	},
	category: {
		flexGrow: 1,
		flexBasis: '25%',
		borderStyle: 'solid',
		borderWidth: 3,
		borderRadius: 7,
		margin: 15,
		padding: 17,
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	icons: {
		color: 'white',
		marginRight: 10,
		marginTop: 30
	},
	titleInput: {
		marginTop: 30,
		marginLeft: 15,
		width: '50%'
	},
	titleInputButtons: {
		color: 'white',
		marginLeft: 15,
		marginTop: 35
	}
};

const EducationList = () => {
	const [ isModer, setIsModer ] = React.useState(false);
	const [ introduction, setIntroduction ] = React.useState('');
	const [ shouldEdit, setShouldEdit ] = React.useState(false);
	const [ sections, setSections ] = React.useState([]);
	const [ shouldAddNewSection, setShouldAddNewSection ] = React.useState(false);
	const [ newSectionTitle, setNewSectionTitle ] = React.useState('');
	const [ titleError, setTitleError ] = React.useState('');
	const [ textError, setTextError ] = React.useState('');
	const [ refreshList, setRefreshList ] = React.useState(false);
	const [ opened, setOpened ] = React.useState(false);

	React.useEffect( () => {
		if(getUserStatus() !== 'user') setIsModer(true);
		loadSections();
	}, [refreshList]);

	const loadSections = async () => {
		const docs = await educationApi.getAllDocuments();
		const introductionDoc = docs.find(doc => doc.title === 'introduction');
		setIntroduction(introductionDoc.text);
		const index = docs.indexOf(introductionDoc);
		docs.splice(index, 1);
		setSections(docs);
	};

	const saveSection = async () => {
		let newSection = new FormData();
		newSection.set('title', newSectionTitle);
		newSection.set('text', 'Information is coming soon...');
		const token = authenticationHelper.isAuthenticated().accessToken;
		const data = await educationApi.create(token, newSection);
		if(data && data.success) {
			setNewSectionTitle('');
			setTitleError('');
			setTextError('');
			setRefreshList(!refreshList);
		} else if(data.error.code) {
			setTitleError('Section is already exists !');
		} else {
			data.error.errors.title ? 
				setTitleError(data.error.errors.title.properties.message) : setTitleError('');
		}
	};

	const updateIntroduction = async () => {
		const data = await educationApi.update('introduction', { text: introduction });
		if(data && data.success) {
			setTextError('');
			setShouldEdit(false);
		} else {
			data.error.errors.text ? 
				setTextError(data.error.errors.text.properties.message) : setTextError('');
		}
	};

	return (
		<Box style={styles.container}>
			<Card 
				style={{
					backgroundColor: paletteController.cardColor,
					paddingLeft: isMobile ? 0 : 50,
					paddingRight: isMobile ? 0 : 50,
					...styles.card
				}}>
				<CardHeader		
					id='introduction-title'
					title='Introduction'
					style={{
						marginLeft: 20,
						marginRight: 20,
						color: paletteController.textColor
					}}
							
				/>
				<CardContent 
					style={{
						paddingLeft: isMobile ? 0 : null,
						paddingRight: isMobile ? 0 : null
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
									id='introduction-textfield'
									variant='outlined'
									defaultValue={introduction}
									multiline
									rows='12'
									style={styles.introductionField}
									onChange={ (event) => setIntroduction(event.target.value) }
								/>
								:
								<Box>
									{
										addWhitespaces(introduction).length < 1000 ?
											<Typography 
												id='introduction-text' 
												component='span' 
												style={{ color: paletteController.textColor }}
											>
												<ReactMarkdown source={addWhitespaces(introduction)} plugins={[breaks]}/>
											</Typography>
											:
											<Box>
												<Collapse in={opened} collapsedHeight={230}>
													<Typography 
														id='introduction-text' 
														component='span' 
														style={{ color: paletteController.textColor }}
													>
														<ReactMarkdown source={addWhitespaces(introduction)} plugins={[breaks]}/>
													</Typography>
												</Collapse>
												<Button 
													onClick={() => setOpened(!opened)}
													style={{color: paletteController.textColor}}
												>
													{opened ? 'Collapse...' : 'View more...'}
												</Button>
											</Box>
									}
								</Box>

						}

						{ textError ? (<Typography id='text-error' color='error'>{textError}</Typography>) : null }

						{
							isModer ?
								<Box>	
									{       
										shouldEdit ? 
											<IconButton
												id='save-changes-button'
												onClick={updateIntroduction} 
												size='small'
												style={{
													backgroundColor: paletteController.mainColor,
													...styles.icons
												}}
											>
												<SaveIcon/>
											</IconButton>
											:
											<IconButton
												id='edit-button'
												onClick={() => setShouldEdit(true)} 
												size='small'
												style={{
													backgroundColor: paletteController.mainColor,
													...styles.icons
												}}
											>
												<EditIcon/>
											</IconButton>
									}
									<IconButton
										id='add-section-button'
										onClick={() => setShouldAddNewSection(true)} 
										size='small'
										style={{
											backgroundColor: paletteController.mainColor,
											...styles.icons
										}}
									>
										<AddIcon/>
									</IconButton>
								</Box>
								:
								null
						}

						{
							shouldAddNewSection ?
								<Box>
									<TextField
										id='section-title-input'
										required
										label='New section title'
										variant='outlined'
										placeholder='Type title...'
										value={newSectionTitle}
										style={styles.titleInput}
										onChange={ 
											(event) => setNewSectionTitle(event.target.value)
										}
									/>
									<IconButton
										id='save-section-button'
										onClick={saveSection} 
										size='small'
										style={{
											backgroundColor: paletteController.mainColor,
											...styles.titleInputButtons
										}}
									>
										<SaveIcon/>
									</IconButton>
									<IconButton
										id='remove-section-button'
										size='small'
										onClick={() => {
											setNewSectionTitle('');
											setShouldAddNewSection(false);
										}} 
										style={{
											backgroundColor: paletteController.mainColor,
											...styles.titleInputButtons
										}}
									>
										<ClearIcon/>
									</IconButton>
									<br/>
									{ titleError ? (<Typography id='title-error' color='error'>{titleError}</Typography>) : null }
								</Box>
								:
								null
						}
					</Box>
					
					<Box
						style={{
							marginLeft: isMobile ? 50 : null,
							marginRight: isMobile ? 50 : null,
							...styles.categoriesList
						}}
					>
						{
							sections ? sections.map((section, index) => (
								<Link
									key={index}
									to={'/education/' + section.title} 
									style={{borderColor: paletteController.textColor, ...styles.category}}
								>
									<Typography variant='h5' component='span' style={{color: paletteController.textColor}}>
										{section.title}
									</Typography>
								</Link>
							))
								:
								null
						}
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default EducationList;
