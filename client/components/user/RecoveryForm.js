import React from 'react';
import { Card, 
	CardContent, 
	Typography, 
	TextField,
	Button,
	CardActions} from '@material-ui/core';
import userApi from '../../api/user.api';
import paletteController from '../../PaletteController';
import SuccessWindow from '../SuccessWindow';

const styles = {
	card: {
		width: '55%',
		minHeight: 200,
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
		<div>
			<Card 
				style={{
					backgroundColor: paletteController.cardColor,
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
		</div>
	);
};

export default RecoveryForm;
