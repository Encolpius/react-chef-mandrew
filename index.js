const PORT = process.env.PORT || 3001
const Recipe = require('./models/recipe')
const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/cookbooks', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/cookbooks/:cookbookName/recipe/:recipeId', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/cookbooks/:cookbookName', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/home', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/create-new', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/api/cookbooks', (request, response) => {
    Recipe.aggregate([
        { $group: { _id: '$title', count: {$sum: 1}} }
    ]).then(counts => {
        response.json(counts)
    })
})

app.get('/about-me', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/api/cookbooks/:cookbookName/', (request, response) => {
    Recipe.find( { title: request.params.cookbookName })
        .then(recipe => {
            if (recipe) {
                response.json(recipe)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => console.log(error))
})

app.get('/api/cookbooks/:cookbookName/recipe/:recipeId', (request, response) => {
    Recipe.find( { title: request.params.cookbookName, recipeId: request.params.recipeId })
        .then(recipe => {
            if (recipe) {
                response.json(recipe)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => console.log(error))
})