const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@helsinki-react.puxbf5q.mongodb.net/cookbookApp?retryWrites=true&w=majority&appName=Helsinki-React`
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

mongoose.set('strictQuery', false)

const recipeSchema = new mongoose.Schema({
    title: String,
    originalTitle: String,
    name: String,
    summary: String,
    ingredients: Array,
    originalInstructions: Array,
    updatedInstructions: Array,
    amount: String,
    recipeId: Number
})

const Recipe = mongoose.model('Recipe', recipeSchema)

// Below is an example of how to write a recipe

const recipe = new Recipe(
    {
        "title": "mastering-the-art-of-french-cooking",
        "originalTitle": "Mastering the Art of French Cooking",
        "name": "Potage Parmentier (Leek or Onion and Potato Soup)",
        "summary": "Leek and potato soup smells good, tastes good, and is simplicity itself to make. It is also versatile as a soup base; add water cress and you have a water-cress soup, or str in cream and chill it for a vichyssoise. To change the formula a bit, add carrots, string beans, cauliflower, broccoli, or anything else you think would go with it, and vary the proportions as you wish.",
        "ingredients": [
            "3-to-4 quart saucepan or pressure cooker",
            "3 to 4 cups or 1 lb peeled potatoes, sliced or diced",
            "3 cups or 1 lb thinly sliced leeks including the tender green; or yellow onions",
            "2 quarts of water",
            "1 tb salt",
            "-",
            "4 to 6 tablespoons whipping cream or 2 to 3 tablespoons softened butter",
            "2 to 3 tablespoons minced parsley or chives"
        ],
        "originalInstructions": [
            "Either simmer the vegetables, water, and salt together, partially covered, for 40 to 50 minutes until the vegetables are tender; or cook under 15 pounds pressure for 5 minutes, release pressure, and simmer uncovered for 15 minutes.",
            "Mash the vegetables in the soup with a fork, or pass the soup through a food mill. Correct seasoning. Set aside uncovered until just before serving, then reheat to a simmer.",
            "Off heat and just before serving, stir in the cream or butter by spoonfuls. Pour into a tureen or soup cups and decorate with the herbs."
        ],
        "updatedInstructions": [
            "Either simmer the vegetables, water, and salt together, partially covered, for 40 to 50 minutes until the vegetables are tender; or cook under 15 pounds pressure for 5 minutes, release pressure, and simmer uncovered for 15 minutes.",
            "Mash the vegetables in the soup with a fork, or pass the soup through a food mill. Correct seasoning. Set aside uncovered until just before serving, then reheat to a simmer.",
            "Off heat and just before serving, stir in the cream or butter by spoonfuls. Pour into a tureen or soup cups and decorate with the herbs."
            ],
        "amount": "For about 2 quarts serving 6 to 8 people",
        "recipeId": 1,
    },
)

/* use to save

recipe.save().then(result => {
  console.log('recipe saved!')
  mongoose.connection.close()
})

*/

if (process.argv.length < 4) {
    Recipe.find({}).then(result => {
        result.forEach(recipe => {
            console.log(`name: ${recipe.name}, id: ${recipe.id}`)
        })
    })
} else {
    recipe.save().then(result => {
        console.log(`added recipe to the database`)
        mongoose.connection.close()
    })
}

module.exports = mongoose.model('Recipe', recipeSchema)