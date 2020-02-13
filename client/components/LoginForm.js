import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, TextField } from '@material-ui/core'

const styles = {
    container: {
        width: '70%',
        minHeight: 200,
        padding: 30
    },
    textInput: {
        width: '70%'
    },
    linkContainer: {
        marginTop: 30
    }
}

const LoginForm = () => {
    return (
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography>Sign In</Typography>

                <TextField style={styles.textInput} label='Email' type='email'/><br/>
                <TextField style={styles.textInput} label='Password' type='password'/><br/>

                <div style={styles.linkContainer}>
                    <Link to='/signup'>Create new account</Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm
