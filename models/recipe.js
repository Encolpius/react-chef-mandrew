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
/*
const recipe = new Recipe(
    {
        "name": "Buttermilk Biscuits",
        "summary": "These biscuits bake up light and fluffy. It's important not to overwork the dough, which would make the biscuits tough. To that end, we pulse the butter and dry ingredients together in a food processor, then turn them out into a bowl and gradually work in the liquids by hand. You can serve them with some good butter and raspberry jam, and perhaps a sprinkle of fleur de sel, but they're so good you might want to eat them as is, straight out of the oven. We serve these with fried chicken, but they make a good brunch accompaniment and also work as a strawberry shortcake biscuit for dessert.",
        "ingredients": [
            "2 cups cake flour",
            "2 cups all-purpose flour",
            "1 tablespoon kosher salt",
            "1 tablespoon baking powder",
            "1 teaspoon baking soda",
            "0.5 pound (2 sticks) unsalted butter, cut into half-inch cubes and chilled",
            "1.5 cups buttermilk, plus 1 to 2 tablespoons for brushing",
            "2 to 3 tablespoons (1 to 1.5 ounces) unsalted butter, melted"
        ],
        "originalInstructions": [
            "Preheat the oven to 425 degrees. Line a baking sheet with parchment paper.",
            "Combine the flours, salt, baking powder, and baking soda in the bowl of a food processor and pulse a few times to blend. Add the chilled butter and pulse several times, until the pieces of butter are no bigger than small peas. Do not overprocess; the dough should not come together.",
            "Transfer the dough to a large bowl and make a well in the center of the flour mixture. Pour in the buttermilk. Stir and lift the mixture with a sturdy spoon, gently working the flour into the buttermilk. The dough should begin to come together but not form a solid mass, or the biscuits may be tough.",
            "Dust a work surface with flour and turn out the dough. Pat the dough into a 3/4-inch-thick rectangle. Using a 2.5-inch round cutter, cut out the biscuits. (If the cutter sticks to the dough, dip the cutter in flour before cutting.) Place the biscuits on the baking sheet. The dough trimmings can be gently pushed together, patted out, and cut one more time; do not overwork the dough.",
            "Brush the tops of the dough lightly with buttermilk. Bake for 15 to 18 minutes, rotating the pan halfway through baking, until a rich golden brown. As soon as you remove the biscuits from the oven, brush the tops with melted butter. Serve warm."
            ],
        "updatedInstructions": [
            "Preheat the oven to 425 degrees. Line a baking sheet with parchment paper. Place the butter cut into cubes in the freezer.",
            "Combine the flours, salt, baking powder, and baking soda in the bowl of a food processor and pulse a few times to blend. Add the chilled butter and pulse 5 times, holding one second per pulse, until the pieces of butter are no bigger than small peas. The dough should not come together.",
            "Transfer the dough to a large bowl and make a well in the center of the flour mixture. Pour in the buttermilk. Makre sure to empty all the buttermilk into the well. Stir and lift the mixture with a sturdy spoon, gently working the flour into the buttermilk. The dough should begin to come together but not form a solid mass, or the biscuits may be tough.",
            "Dust a work surface with flour and turn out the dough. Pat the dough into a 3/4-inch-thick rectangle; do not knead. Divide into four and stack each square on top of each other; use a rolling pin to gently roll out into a rectangle again about 2 inches tall",
            "Set aside a small bowl of flour. Using a 2.5-inch round cutter, cut out the biscuits; if the cutter sticks to the dough, dip the cutter in flour before cutting. Place the biscuits on the baking sheet. The dough trimmings can be gently pushed together, patted out, and cut one more time",
            "Brush the tops of the dough lightly with buttermilk. Bake for 15 to 18 minutes, rotating the pan halfway through baking, until a rich golden brown. As soon as you remove the biscuits from the oven, brush half the tops with melted butter; Alexi prefers several to not have the additional butter. Add fleur de sel salt, if desired. Serve warm."
            ],
            "amount": "Makes 12 biscuits",
        "recipeId": 2,
    },
)
*/

if (process.argv.length < 4) {
    Recipe.find({}).then(result => {
        result.forEach(recipe => {
            console.log(`name: ${recipe.name}, id: ${recipe.id}`)
        })
    })
} else {
    recipe.save().then(result => {
        console.log(`added recipe to the cookbook`)
        mongoose.connection.close()
    })
}

module.exports = mongoose.model('Recipe', recipeSchema)