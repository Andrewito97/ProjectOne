import React from 'react'
import { Card, CardContent, Typography, TextField } from '@material-ui/core'

const styles = {

}

const SignUpForm = () => {
    return (
        <Card>
            <CardContent>
                <Typography>Sign Up</Typography>
                <TextField label='Name'/>
                <TextField label='Email'/>
            </CardContent>
        </Card>
    )
}

export default SignUpForm
