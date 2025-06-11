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

app.get('/about-me', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'about-me.html')); 
})

app.get('/api/ad-hoc', (request, response) => {
    Recipe.find({}).then(recipes => {
        response.json(recipes)
    })
})

app.get('/recipe/:recipeId', (request, response) => {
    console.log('here')
    Recipe.findOne(request.params.recipeId)
        .then(recipe => {
            console.log(recipe)
            if (recipe) {
                response.json(recipe)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => console.log(error))
})