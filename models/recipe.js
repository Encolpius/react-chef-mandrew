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
    summary: Array,
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
        "title": "dishoom",
        "originalTitle": "Dishoom",
        "name": 'Jeera Biscuits',
        "summary": [
            'These slightly sweet, slightly savory, pleasantly short and delightfully buttery biscuits are flecked with jeera (cumin seeds). They are sold in chai shops all over Bombay for a few rupees each. Such temptation!'
        ],
        "ingredients": [
            "75g unsalted butter, softened to room temperature",
            "25g caster sugar",
            "100g plain (all-purpose) flour",
            "1/2 teaspoon fine sea salt",
            "1 teaspoon cumin seeds",
            "1 teaspoon baking powder"
        ],
        "originalInstructions": [
            "Tip the butter and sugar into a large bowl and beat until light and fluffy.",
            "Mix the flour, salt, cumin seeds and baking powder together, then tip into the creamed butter and sugar mixture. Mix to combine, gently bringing the dough together without overworking it. Form into a log shape, about 5cm in diameter, and wrap in cling film. Place in the fridge for 30 minutes.",
            "Heat the oven to 200 celsius/Fan 180 celsius/Gas 6. Line a large baking sheet with baking parchment.",
            "Remove the dough from the fridge, slice into discs, about 7-8mm thick, and lay on the lined baking sheet. Bake for 15 - 18 minutes, or until golden brown and cooked through.",
            "Transfer the biscuits to a wire rack and leave to cool. They will keep in an airtight container for up to 2 days."
        ],
        "updatedInstructions": [
            "An hour before beginning, take the salt out of the fridge to warm up to room temperature.",
            "Tip the butter and sugar into a large bowl and beat until light and fluffy, about 5 minutes, scraping the sides of the bowl as necessary (roughly every 2 minutes).",
            "Mix the flour, salt, cumin seeds and baking powder together, then tip into the creamed butter and sugar mixture still in the stand mixer. Mix to combine, gently mixing the the ingredients at low speed until mixture looks smooth and comes together into the form of a dough. Add 1 - 2 tablespoons of milk as needed. Using a roller, shape the dough into a flat disc roughly 1/4-inch in thickness. Place in the fridge and chill for 30 minutes.",
            "Preheat the oven to 365. Line a large baking sheet with a SilPat.",
            "Remove the dough from the fridge and cut the dough into 2-inch circles using a cutter and lay on the SilPat. Bake for 10 minutes, then lower the oven temperature to 340 and bake for at least 5 minutes longer, more if you want crisiper biscuits (they may still feel soft when removed from the oven, but will harden). 9 minutes was a good, crispy length.",
            "Transfer the biscuits to a wire rack and let cool. They will keep in an airtight container for up to 2 days."
        ],
        "amount": "SMakes 10-12",
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