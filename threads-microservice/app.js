const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');

const port = 3500
const threads = []
const app = express()

app.use(bodyParser.json())

app.get('/status', (req, res) => {
    res.status(201).send({
        microservice: 'threads',
        status: 'UP'
    })
})

app.get('/threads', (req, res) => {
    res.status(201).send(threads)
})

app.post('/threads', (req, res) => {
    let thread = { title: req.body.content, id: uuidv4() }
    threads.push(thread)
    res.status(201).send(thread)
})

app.listen(port, () => {
    console.log(`Threads microservice running at http://localhost:${port}`);
})