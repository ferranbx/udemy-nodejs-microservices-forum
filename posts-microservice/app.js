const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');

const port = 3500
const posts = []
const app = express()

app.use(bodyParser.json())

app.get('/status', (req, res) => {
    res.status(201).send({
        microservice: 'posts',
        status: 'UP'
    })
})

app.get('/posts', (req, res) => {
    res.status(201).send(posts)
})

app.post('/posts', (req, res) => {
    let post = { title: req.body.content, id: uuidv4() }
    posts.push(post)
    res.status(201).send(post)
})

app.listen(port, () => {
    console.log(`Posts microservice running at http://localhost:${port}`);
})