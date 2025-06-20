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

const recipe = new Recipe(
    {
        "name": "Grissini",
        "summary": "Simple breadsticks, fun to hold, satisfyingly crunchy. You can take these breadsticks in numerous directions, flattening them for a different texture, or using different oils - garlic rather than plain olive oil, for instance - different seasoning, or chopped herbs. These go well with salads, such as a tomato salad where you want some contrasting texture.",
        "ingredients": [
            "1/2 cup warm water (110 to 115 degrees)",
            "1 tablespoon active dry yeast (not quick-rising)",
            "180 grams (1.5 cups) all-purpose flour, plus additional as needed",
            "54 grams (1/3 cup) fine semolina flour",
            "1/4 cup freshly grated Parmigiano-Reggiano",
            "1 teaspoon ground fleur de sel or fine sea salt",
            "2 tablespoons olive oil, plus additional for brushing",
            "Coarsely ground black pepper"
        ],
        "originalInstructions": [
            "Combine the water and yeast in a small bowl. Let stand 10 minutes, than stir until the yeast is completely dissolved.",
            "Combine the flours, cheese, and salt in a large bowl. Make a well in the center of the dry ingredients. Stir the oil into the yeast mixture, then pour into the well and mix together with a fork. Once the dough comes together, transfer to a lightly floured board and knead, adding a dusting of all-purpose flour as necessary (depending on the flours and humidity, you may need up to an additional 1/4 cup), until a smooth dough forms. Shape the dough into a ball and roll on the board to coat very lightly with flour.",
            "Transfer the dough to a medium bowl, cover with a damp towel, and let rest in a warm place for about 15 minutes, or until it has risen slightly.",
            "Position the oven racks in the lower and upper thirds of the oven and preheat the oven to 400 degrees. Line two baking sheets with parchment paper.",
            "Turn the dough out onto the floured work surface and, using a dough scraper or sharp knife, cut the dough in half. Cut one half into 12 pieces for short grissini, or 6 pieces for long grissini. Roll each piece into a rope about 9 inches long for short grissini, or about 15 inches long for long grissini. You can leave them round or twist or flatten them, or a combination of the two. The thinner or flatter they are, the crispier the result; thicker grissini may be doughier, if that is your preference. Transfer to one of the parchment-lined baking sheets as you form them.",
            "Coarsely grind a light dusting of pepper onto a section of the work surface; it is easier to control the amount of pepper that will be rolled onto the grissini by keeping the area small. (Alternatively, omit the pepper and sprinkle the grissini with fleur de sel or seed.) Light brush the grissini with olive oil. One at a time, roll in the pepper and return to the parchment; grind additional pepper as needed. Repeat with the remaining dough. (The grissini can be held for up to an hour on the baking sheets in a cool spot. Or, to hold them longer, cover with parchment paper, wrap the baking sheets in plastic wrap, and refrigerate for up to 6 hours.",
            "Bake the grissini, switching the position of the pans and rotating them halfway through baking, until golden and crisp, 16 to 18 minutes. Cool on the pans in a rack. Store in an airtight container for up to 1 week."
            ],
        "updatedInstructions": [
            "Combine the water and yeast in a small bowl. Let stand 10 minutes, than stir until the yeast is completely dissolved.",
            "Combine the flours, cheese, and salt in a large bowl. Make a well in the center of the dry ingredients. Stir the oil into the yeast mixture, then pour into the well and mix together with a fork. Once the dough comes together, transfer to a lightly floured board and knead, adding a dusting of all-purpose flour as necessary (depending on the flours and humidity, you may need up to an additional 1/4 cup), until a smooth dough forms. Shape the dough into a ball and roll on the board to coat very lightly with flour.",
            "Transfer the dough to a medium bowl, cover with a damp towel, and let rest in a warm place for about 15 minutes, or until it has risen slightly.",
            "Position the oven racks in the lower and upper thirds of the oven and preheat the oven to 400 degrees. Line two baking sheets with parchment paper.",
            "Turn the dough out onto the floured work surface and, using a dough scraper or sharp knife, cut the dough in half. Cut one half into 12 pieces for short grissini, or 6 pieces for long grissini. Roll each piece into a rope about 9 inches long for short grissini, or about 15 inches long for long grissini. You can leave them round or twist or flatten them, or a combination of the two. The thinner or flatter they are, the crispier the result; thicker grissini may be doughier, if that is your preference. Transfer to one of the parchment-lined baking sheets as you form them.",
            "Coarsely grind a light dusting of pepper onto a section of the work surface; it is easier to control the amount of pepper that will be rolled onto the grissini by keeping the area small. (Alternatively, omit the pepper and sprinkle the grissini with fleur de sel or seed.) Light brush the grissini with olive oil. One at a time, roll in the pepper and return to the parchment; grind additional pepper as needed. Repeat with the remaining dough. (The grissini can be held for up to an hour on the baking sheets in a cool spot. Or, to hold them longer, cover with parchment paper, wrap the baking sheets in plastic wrap, and refrigerate for up to 6 hours.",
            "Bake the grissini, switching the position of the pans and rotating them halfway through baking, until golden and crisp, 16 to 18 minutes. Cool on the pans in a rack. Store in an airtight container for up to 1 week."
            ],
            "amount": "Makes 24 small or 12 large grissini",
        "recipeId": 4,
    },
)

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