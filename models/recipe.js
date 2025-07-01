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
        "title": "ad-hoc-at-home",
        "name": "Candied Pecans",
        "summary": "",
        "ingredients": [
            "3 cups raw pecan halves",
            "3 tablespoons clover honey",
            "3/4 tespoon ground fleur de sel or fine sea salt, plus a pinch",
        ],
        "originalInstructions": [
            "Position the racks in the upper and lower thirds of the oven and preheat the oven to 250 degrees.",
            "Line a baking sheet with parchment paper and spread the nuts on the pan. Warm in the oven for 5 minutes (warming the nuts helps prevent them from crystallizing the honey)",
            "Meanwhile, pour the honey into a small saucepan and warm over medium heat.",
            "Pour the nuts into a bowl, add the honey, and sprinkle with a pinch of salt. Stir the nuts evenly with the honey.",
            "Line two baking sheets with SilPats and spread the nuts on the sheets. Sprinkle with the remaining 3/4 teaspoon salt. Bake for two hours, rotating the pans halfway through baking.",
            "Remove the pans from the oven and separate any nuts that cling together. Let the nuts cool on the pans.",
            "Store in an airtight container for up to 1 week."
        ],
        "updatedInstructions": [
             "Position the racks in the upper and lower thirds of the oven and preheat the oven to 250 degrees.",
            "Line a baking sheet with parchment paper and spread the nuts on the pan. Warm in the oven for 5 minutes (warming the nuts helps prevent them from crystallizing the honey)",
            "Meanwhile, pour the honey into a small saucepan and warm over medium heat.",
            "Pour the nuts into a bowl, add the honey, and sprinkle with a pinch of salt. Stir the nuts evenly with the honey.",
            "Line two baking sheets with SilPats and spread the nuts on the sheets. Sprinkle with the remaining 3/4 teaspoon salt. Bake for two hours, rotating the pans halfway through baking.",
            "Remove the pans from the oven and separate any nuts that cling together. Let the nuts cool on the pans.",
            "Store in an airtight container for up to 1 week."
            ],
        "amount": "Makes 24 small or 12 large grissini",
        "recipeId": 4,
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