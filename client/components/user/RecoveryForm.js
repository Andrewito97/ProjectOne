import React from 'react';
import { isMobile } from 'react-device-detect';
import { Card,
	CardContent,
	Box,
	Typography, 
	TextField,
	Button,
	CardActions} from '@material-ui/core';
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
		minHeight: 200,
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10,
		padding: 50
	},
	emailInput: {
		marginTop: 40,
		width: '100%'
	},
	sendLinkButton: {
		color: 'white',
		marginTop: 60
	},
	loginButton: {
		color: 'white',
		marginTop: 60
	}
};

const RecoveryForm = () => {
	const [ requestedEmail, setEmail ] = React.useState('');
	const [ emailError, setEmailError ] = React.useState('');
	const [ successed, setSuccessed ] = React.useState(false);

	const onRecover = async () => {
		const userData = {
			email: requestedEmail,
		};
		const data = await userApi.recoverPassword(userData);
		data.emailError ? setEmailError(data.emailError) : setEmailError('');
		data.message ? setSuccessed(true) : null;
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
                        Recovery
					</Typography>

					<TextField
						id='email-input'
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
					{ emailError ? (<Typography id='email-error' color='error'>{emailError}</Typography>) : null }

					<CardActions>
						<Button
							id='send-link-button'
							onClick={onRecover}
							style={{
								backgroundColor: paletteController.mainColor,
								...styles.sendLinkButton
							}}
						>
                            Send recovery link
						</Button>
					</CardActions>
				</CardContent>
			</Card>
			<SuccessWindow
				open={successed}
				message='Recovery link has been sent successfuly'
				onClick={() => setSuccessed(false)}
			/>
		</Box>
	);
};

export default RecoveryForm;
