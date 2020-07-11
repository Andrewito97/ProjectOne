import React from 'react';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         Button,
         CardActions } from '@material-ui/core';
import SuccessWindow from './SuccessWindow';
import otherApi from '../api/other.api';
import paletteController from '../PaletteController';

const styles = {
    card: {
        paddingTop: 50,
        paddingBottom: 50,
        paddingRight: 60,
        paddingLeft: 60,
    },
    emailInput: {
        marginTop: 40,
        marginLeft: 5,
        width: '100%'
    },
    titleInput: {
        marginTop: 30,
        marginLeft: 5,
        width: '100%'
    },
    textInput: {
        marginTop: 30,
        marginLeft: 5,
        width: '100%'
    },
    error: {
        marginLeft: 5,
    },
    submitButton: {
        marginTop: 60,
        color: 'white'
    }
};

const LoginForm = () => {
    const [ email, setEmail ] = React.useState('');
    const [ emailError, setEmailError ] = React.useState('');
    const [ title, setTitle ] = React.useState('');
    const [ titleError, setTitleError ] = React.useState('');
    const [ text, setText ] = React.useState('');
    const [ textError, setTextError ] = React.useState('');
    const [ successed, setSuccessed ] = React.useState(false);

    const onSubmit = async () => {
        const mailData = {
            email: email,
            title: title,
            text: text
        };
        const data = await otherApi.sendToSupport(mailData);
        if(data.message) {
            setEmail('');
            setEmailError('');
            setTitle('');
            setTitleError('');
            setText('');
            setTextError('');
            setSuccessed(true);
        };
        if(data.errors) {
            data.errors.email ? setEmailError(data.errors.email) : setEmailError('');
            data.errors.title ? setTitleError(data.errors.title) : setTitleError('');
            data.errors.text ? setTextError(data.errors.text) : setTextError('');
        };
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
                        Support
                    </Typography>

                    <TextField 
                        id='email'
                        required
                        label='Email' 
                        variant='outlined'
                        placeholder='Type your email...'
                        type='email'
                        value={email}
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
                        id='title'
                        required
                        label='Title' 
                        variant='outlined'
                        placeholder='Type a title of the problem...'
                        value={title} 
                        style={styles.titleInput} 
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <br/>
                    { 
                        titleError ? 
                        (<Typography 
                            id='title-error' 
                            color='error'
                            style={styles.error}
                        >
                            {titleError}
                        </Typography>) 
                        : 
                        null 
                    }

                    <TextField   
                        id='text'
                        required
                        label='Text' 
                        variant='outlined'
                        multiline
                        rows='15'
                        placeholder='Describe your problem...'
                        value={text} 
                        style={styles.textInput} 
                        onChange={(event) => setText(event.target.value)}
                    />
                    <br/>
                    { 
                        textError ? 
                        (<Typography 
                            id='text-error' 
                            color='error'
                            style={styles.error}
                        >
                            {textError}
                        </Typography>) 
                        : 
                        null 
                    }

                    <CardActions>
                        <Button
                            id='submit-button'
                            onClick={onSubmit}
                            style={{
                                backgroundColor: paletteController.mainColor,
                                ...styles.submitButton
                            }}
                        >
                            Submit
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
            <SuccessWindow
                open={successed}
                message='Thanks you! Wait for support to answer !'
                onClick={() => setSuccessed(false)}
            />
        </div>
    )
};

export default LoginForm;
