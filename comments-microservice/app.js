const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');

const port = 4000
const comments = []
const app = express()

app.use(bodyParser.json())

app.get('/status', (req, res) => {
    res.status(201).send({
        microservice: 'comments',
        status: 'UP'
    })
})

app.get('/posts/:post_id/comments', (req, res) => {
    let filteredComments = comments.filter(comment => comment.parent === req.params.post_id) || []
    res.status(201).send(filteredComments)
})

app.post('/posts/:post_id/comments', (req, res) => {
    let comment = {
        content: req.body.content,
        parent: req.params.post_id,
        id: uuidv4()
    }
    comments.push(comment)
    res.status(201).send(comment)
})

app.listen(port, () => {
    console.log(`Comments microservice running at http://localhost:${port}`);
})