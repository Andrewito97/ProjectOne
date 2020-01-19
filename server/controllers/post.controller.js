const postController = {
    showHi(request, response) {
        response.status(200).send('This is my post!!!...')
    }
}

export default postController