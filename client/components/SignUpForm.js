import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, TextField, CardActions, Button } from '@material-ui/core'
import userApi from '../api/userApi'

const styles = {
    container: {
        width: '70%',
        minHeight: 350,
        padding: 30
    },
    textInput: {
        width: '70%'
    },
    linkContainer: {
        marginTop: 30
    },
    button: {
        backgroundColor: '#1976D2' ,
        color: 'white',
        marginTop: 60
    }
}

const SignUpForm = () => {
    const [requestedName, setName] = React.useState('')
    const [requestedEmail, setEmail] = React.useState('')
    const [requestedPassword, setPassword] = React.useState('')
    const onCreate = async () => {
        const userData = {
            name: requestedName,
            email: requestedEmail,
            password: requestedPassword
        }
        userApi.create(userData)
    }
    return (
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography>Sign Up</Typography>

                <TextField style={styles.textInput} 
                           label='Name' 
                           value={requestedName} 
                           onChange={(event) => setName(event.target.value)}
                /><br/>
                <TextField style={styles.textInput} 
                           label='Email' 
                           type='email'
                           value={requestedEmail}
                           onChange={(event) => setEmail(event.target.value)}
                /><br/>
                <TextField style={styles.textInput} 
                           label='Password' 
                           type='password'
                           value={requestedPassword}
                           onChange={(event) => setPassword(event.target.value)}
                /><br/>

                <div style={styles.linkContainer}>
                    <Link to='/login'>Allready have an account? Login</Link>
                </div>

                <CardActions>
                    <Button style={styles.button} onClick={onCreate}>Create</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default SignUpForm
