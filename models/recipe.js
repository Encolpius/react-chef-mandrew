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
        "title": "bravetart",
        "originalTitle": "BraveTart",
        "name": "Brown Butter Chopped Chocolate Chip Cookies",
        "summary": "A pinch of nutmeg and a sprinkling of salt amplify the butterscotchy flavor of chocolate chip cookies, while a blend of milk and dark chocolate provide alternating bites of creamy sweetness and bitter intensity. You can bake the cookies until they're golden brown and crunchy, but I prefer to pull them while they're still a wee bit pale so they stay soft and fudgy, crisp only around the very edges.",
        "ingredients": [
            "2 1/2 cups | 14 oz roughly chopped milxed, dark, or white chocolate (not chips)",
            "354g all-purpose flour",
            "2.5 sticks unsalted butter",
            "8 ounces light brown sugar",
            "7.25 ounces granulatd white sugar",
            "2 teaspoons Diamond Crystal kosher salt",
            "1 teaspoon baking soda",
            "1/2 teaspoon baking powder",
            "1 tablespoon vanilla extract",
            "1/8 teaspoon grated nutmeg",
            "2 large eggs, straight from the fridge"
        ],
        "originalInstructions": [
            "Adjust oven rack to middle position and preheat oven to 250 farenheit. Set a handful of chopped chocolate aside. Place remainder in a medium bowl, sift flour on top (if using cup measures, spoon flour into the cups and level with a knife before sifting), and toss to combine.",
            "Combine butter, brown sugar, white sugar, baking soda, baking powder, vanilla, and nutmeg in the bowl of a stand mixer fitted with the paddle attachment. Mix on low speed to moisten, then increase to medium and beat until fluffy, about 5 minutes. With the mixer running, crack in the egg and continue beating until smooth. Reduce speed to low, add flour/chocolate, and mix to form a stiff dough.",
            "Divide into thirty-two 1.5 ounce (2-tablespoon) or sixty-four .75 ounces (1-tablespoon) portions. Arrange on parchment-lined aluminum baking sheets, leaving 2 inches between them. Sprinkle with reserved chocolate and a pinch each of kosher salt. Bake until the cookies are puffed and pale gold around the edges but steamy in the middle, about 15 minutes for large, 12 minutes for small. Or, for crunchy cookies, continue baking until golden, 3 to 5 minutes more.",
            "Cool on the baking sheets until set, about 5 minutes. Enjoy warm, or store in an airtight container for up to 2 days at room temperature.",
            "VARIATION - BROWN BUTTER: Ready for a total knockout? Up the butter to 10 ounces (2.5 sticks) and use 2 eggs. In a 2-quart stainless steel saucepan, melt the butter over medium-low heat. Increase to medium and simmer, stirring with a heat-resistant spatula, while the butter hisses and pops. Continue cooking and stirring, scraping up any brown bits that form on the bottom of the pan, until butter is golden yellow and perfectly silent. Pour into the bowl of a stand mixer, making sure to scrape up all the toasty brown bits, and cool until semi-solid and opaque. Proceed with the recipe as directed, incorporating the second egg after the first."
        ],
        "updatedInstructions": [
            "In a medium stainless steel saucepan, melt the butter over medium-low heat, set at 3.5, about 10 minutes. Increase to medium (5) and simmer, stirring with a heat-resistant spatula, while the butter hisses and pops. Continue cooking and stirring, scraping up any brown bits that form on the bottom of the pan, until butter is golden yellow and perfectly silent, around 12 minutes. Pour into the bowl of a stand mixer, making sure to scrape up all the toasty brown bits, and cool until semi-solid and opaque, about one hour. Give the cooling brown butter a quick stir every fifteen minutes.",
            "While butter cools, Uuse a serrated knife to coarsely chop the chocolate before using placing in a medium bowl and using a fine mesh strainer to sift the flour on top. Toss to combine.",
            "Adjust oven rack to middle position and preheat oven to 250 farenheit.",
            "Add the brown sugar, white sugar, baking soda, baking powder, vanilla, and nutmeg to the bowl of the stand mixer fitted with a paddle attachment. Mix on low speed (use the 'stir' option on the stand mixer) to moisten, then increase to medium (4) and beat until fluffy, about 5 minutes. With the mixer running, crack in the egg and continue beating until smooth. Reduce speed to low ('stir' mode again), add flour/chocolate, and mix to form a stiff dough.",
            "Place the stand mixer bowl in the fridge for an hour to chill.",
            "Pull out a rimmed baking sheet and place a layer of parchment paper on top. Divide the dough into around thirty-two 1.5 ounce (2-tablespoon) portions. Arrange on the baking sheet, then place in the freezer for an hour. When the dough is fully chilled, add the balls of dough to a gallon-sized bag and place back in the freezer until needed.",
            "When ready to bake, add the required number of cookies to a baking sheet lined with parchment paper. Turn on the oven to 350, then add a pinch to each with kosher salt. Bake until the cookies are puffed and pale gold around the edges but steamy in the middle, about 14 minutes.",
            "Cool on the baking sheets until set, about 5 minutes. Enjoy warm, or place on a plate and then set the plate out of reach of a certain hungry wild beast who looks the smell of chocolate chip cookies.",
        ],
        "amount": "Makes 32 - 64 cookies.",
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