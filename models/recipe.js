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
        "title": "bouchon",
        "originalTitle": "Bouchon",
        "name": "Garlic Confit",
        "summary": "At the restaurant, garlic confit is used in so many preparations that we consider it to be a pantry staple. It's such a great flavoring device for everything from shellfish to mashed potatoes, or to be stirred into soup or spread on a baguette for a tartine. The oil the garlic is cooked in can be used as well.",
        "ingredients": [
            "1 cup peeled garlic cloves (about 45)",
            "about 2 cups canola oil"
        ],
        "originalInstructions": [
            "Cut off and discard the root ends of the garlic cloves. Place the cloves in a small saucepan and add enough oil to cove them by one inch - none of the garlic cloves should be poking through the oil.",
            "Place the saucepan on a diffuser over medium-low heat. The cloves should cook gently: Very small bubbles will come up through the oil, but the bubbles should not break the surface. Adjust the heat as necessary and move the pan to one side of the diffuser if it is cooking too quickly. Cook the garlic for about 40 minutes, stirring every 5 minutes or so, until the closed are completely tender when pierces with the tip of a knife. Remove the saucepan from the heat and allow the garlic to cool in the oil.",
            "Refrigerate the garlic, submerged in the oil, for up to one month."
        ],
        "updatedInstructions": [
            "Cut off and discard the root ends of the garlic cloves. Place the cloves in a small saucepan and add enough oil to cove them by one inch - none of the garlic cloves should be poking through the oil.",
            "Place the saucepan on a diffuser over medium-low heat. The cloves should cook gently: Very small bubbles will come up through the oil, but the bubbles should not break the surface. Adjust the heat as necessary and move the pan to one side of the diffuser if it is cooking too quickly. Cook the garlic for about 40 minutes, stirring every 5 minutes or so, until the closed are completely tender when pierces with the tip of a knife. Remove the saucepan from the heat and allow the garlic to cool in the oil.",
            "Refrigerate the garlic, submerged in the oil, for up to one month.",
            "IMPORTANT: Do not treat this recipe lightly. Garlic placed in an anaerobic environment (the oil) can lead to botulism poisoning if not treated and cooked properly. Make sure to place a date on the container the garlic confit is placed in to indicate when the remaining confit should be discarded."
            ],
        "amount": "Makes 1 cup",
        "recipeId": 2,
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