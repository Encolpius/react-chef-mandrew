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
        "title": "the-food-lab",
        "originalTitle": "The Food Lab",
        "name": 'Extra-Crispy Sunny-Side Up Eggs',
        "summary": "",
        "ingredients": [
            "2 large eggd",
            "3 tablespoons olive oil (extra-virgin, if you prefer",
            "Kosher salt and freshly ground black pepper"
        ],
        "originalInstructions": [
            "Break one egg into a small cup, then transfer to a fine-mesh strainer set over a bowl and swirl gently until one excess white passes through. Return the egg to the cup. Repeat with the second egg.",
            "Heat the olive oil in a medium nonstick or cast-iron skillet over medium heat until it registers 300 degrees Fahrenheit on an instant-read thermometer. Carefully slip the eggs into the oil. Immediately tilt the skillet so that the oil pools on one side and use a spoon to spoon the hot oil over the egg whites, trying to avoid the yolks as much as possible. Continue doing this until the egg whites are completely set and crisp on the bottom, about 1 minute. With a spatula, transfer the eggs to a paper-towel-lined plate and season with salt and pepper. Serve immediately."
        ],
        "updatedInstructions": [
            "Break one egg into a small cup, then transfer to a fine-mesh strainer set over a bowl and swirl gently until one excess white passes through. Return the egg to the cup. Repeat with the second egg.",
            "Heat the olive oil in a medium nonstick or cast-iron skillet over medium heat until it registers 300 degrees Fahrenheit on an instant-read thermometer. Carefully slip the eggs into the oil. Immediately tilt the skillet so that the oil pools on one side and use a spoon to spoon the hot oil over the egg whites, trying to avoid the yolks as much as possible. Continue doing this until the egg whites are completely set and crisp on the bottom, about 1 minute. With a spatula, transfer the eggs to a paper-towel-lined plate and season with salt and pepper. Serve immediately."
        ],
        "amount": "Serves 1",
        "recipeId": 7,
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