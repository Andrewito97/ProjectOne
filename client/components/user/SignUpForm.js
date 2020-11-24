import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Card,
	CardContent,
	Box,
	Typography,
	TextField,
	CardActions, 
	Button } from '@material-ui/core';
import userApi from '../../api/user.api';
import paletteController from '../../PaletteController';
import SuccessWindow from '../SuccessWindow';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	},
	card: {
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10,
		padding: 50
	},
	nameInput: {
		marginTop: 40,
		marginLeft: 5,
		width: '100%'
	},
	emailInput: {
		marginTop: 30,
		marginLeft: 5,
		width: '100%'
	},
	passwordInput: {
		marginTop: 30,
		marginLeft: 5,
		width: '100%'
	},
	confirmPasswordInput: {
		marginTop: 30,
		marginLeft: 5,
		width: '100%'
	},
	error: {
		marginLeft: 5,
	},
	linkContainer: {
		marginTop: 30,
		marginLeft: 8
	},
	createButton: {
		color: 'white',
		marginTop: 60
	},
	loginButton: {
		color: 'white',
		marginTop: 60
	}
};

const SignUpForm = () => {
	const [ requestedName, setName ] = React.useState('');
	const [ requestedEmail, setEmail ] = React.useState('');
	const [ requestedPassword, setPassword ] = React.useState('');
	const [ confirmedPassword, setConfirmedPassword ] = React.useState('');
	const [ nameError, setNameError ] = React.useState('');
	const [ emailError, setEmailError ] = React.useState('');
	const [ passwordError, setPasswordError ] = React.useState('');
	const [ successed, setSuccessed ] = React.useState(false);

	const onCreate = async () => {
		if(requestedPassword !== confirmedPassword) {
			return setPasswordError('Passwords don\'t match !');
		}
		const userData = {
			name: requestedName,
			email: requestedEmail,
			password: requestedPassword,
		};
		const data = await userApi.create(userData);
		if(data.message) {       
			setName('');
			setNameError('');
			setEmail('');
			setEmailError('');
			setPassword('');
			setConfirmedPassword('');
			setPasswordError('');
			setSuccessed(true);
		} else {
			if(data.error.code) {
				setEmailError('Email is already existss !');
			} else {
				data.error.errors.email ? 
					setEmailError(data.error.errors.email.properties.message) : setEmailError('');
				data.error.errors.name ? 
					setNameError(data.error.errors.name.properties.message) : setNameError('');
				data.error.errors.password ? 
					setPasswordError(data.error.errors.password.properties.message) : setPasswordError('');
			}
		}
	};
    
	return (
		<Box style={styles.container}>
			<Card
				raised
				style={{
					backgroundColor: paletteController.cardColor,
					width: isMobile ? null : '55%',
					...styles.card
				}}
			>
				<CardContent style={styles.content}>     
					<Typography
						id='page-title'
						variant='h5'
						style={{
							color: paletteController.textColor
						}}
					>
                        Sign Up
					</Typography>

					<TextField
						id='name'
						required
						label='Name' 
						variant='outlined'
						placeholder='Type your name...'
						value={requestedName} 
						style={styles.nameInput} 
						onChange={(event) => setName(event.target.value)}
					/>
					<br/>
					{ 
						nameError ? 
							(<Typography 
								id='name-error' 
								color='error'
								style={styles.error}
							>
								{nameError}
							</Typography>) 
							: 
							null 
					}

					<TextField
						id='email'
						required
						label='Email' 
						variant='outlined'
						placeholder='Type your email...'
						type='email'
						value={requestedEmail}
						style={styles.emailInput}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<br/>
					{ 
						emailError ? 
							(<Typography 
								id='email-error' 
								color='error'
								style={styles.error}
							>
								{emailError}
							</Typography>) 
							: 
							null 
					}

					<TextField
						id='password'
						required
						label='Password' 
						variant='outlined'
						placeholder='Type your password...'
						type='password'
						value={requestedPassword}
						style={styles.passwordInput} 
						onChange={(event) => setPassword(event.target.value)}
					/>
					<br/>

					<TextField 
						id='confirm-password'
						required
						label='Confrm password' 
						variant='outlined'
						placeholder='Confirm your password...'
						type='password'
						value={confirmedPassword}
						style={styles.confirmPasswordInput} 
						onChange={(event) => setConfirmedPassword(event.target.value)}
					/>
					<br/>
					{ 
						passwordError ? 
							(<Typography 
								id='password-error' 
								color='error'
								style={styles.error}
							>
								{passwordError}
							</Typography>) 
							:
							null 
					}

					<Typography style={styles.linkContainer}>
						<Link to='/login'>Allready have an account? Login</Link>
					</Typography>

					<CardActions>
						<Button 
							id='create-button'
							onClick={onCreate}
							style={{
								backgroundColor: paletteController.mainColor,
								...styles.createButton
							}}
						>
                            Create
						</Button>
					</CardActions>
				</CardContent>
			</Card>
			<SuccessWindow
				open={successed}
				message='Account created successfully'
				onClick={() => setSuccessed(false)}
			/>
		</Box>
	);
};

export default SignUpForm;
