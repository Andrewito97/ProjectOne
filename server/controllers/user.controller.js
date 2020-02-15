import User from '../models/user.model'

const userController = {
    create(request, response) {
        const user = new User(request.body)
        user.save( (error, result) => {
            if(error) {
                response.status(400).json({ error })
            } else {
                response.status(200).json({ message: "Successfully signed up!" })
            }

        })
    }
}

export default userController