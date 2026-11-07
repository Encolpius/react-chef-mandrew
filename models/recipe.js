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
        "title": "king-arthur-baking-school",
        "originalTitle": "King Arthur Baking School",
        "name": "Lemon Shortbread Cookies*",
        "summary": [
            "This is such a simple yet versatile cookie recipe, and over the years we've made it as a drop cookie, a rolled sandwich variation, and even a hand-formed tartlet - which is why we start with it and keep it separate from the other categories of cookies that follow. The butter here is fully creamed (as it would be for cake batter) to provide leavening for the cookie, so you'll notice there's no baking soda or powder. The confectioner's sugar makes for an incredibly tender, melt-in-your-mouth texture rather than the sandy texture you often find with shortbread. This cookie is butter-rich but not too sweet. If you like a sweeter cookie, dredge in granulated sugar before baking or confectioner's sugar after - or sandwich them together with sweet icing. Shortbread lends itself to any number of variations - you can change or omit the lemon zest, add different spices or extracts, or just leave it plain. Feel free to play with some of your favorite flavor combinations."
        ],
        "ingredients": [
            "227 grams (16 tablespoons) unsalted butter, room temperature",
            "1/4 teaspoon salt",
            "57 grams (1/2 cup) confectioner's sugar, plus more for garnish (optional)",
            "Zest of 1 lemon",
            "240 grams (2 cups) unbleached all-purpose flour, plus more for dusting"
        ],
        "originalInstructions": [
            "Line two baking sheets with parchment.",
            "Combine the butter and salt in the bowl of a stand mixer and cream together until soft and fluffy.",
            "Mix in the confectioner's sugar and lemon zest.",
            "Add the flour and mix until well combined.",
            "Transfer the dough to a lightly floured surface and pat it into a disc about 1-inch thick. Wrap the disc and chill for about 15 minutes, or until cool but not firm.",
            "Preheat the oven to 350 Fahrenheit.",
            "On a lightly floured surface, roll the dough to about 1/4-inch thick.",
            "Using a 2-inch round cutter, cut shapes from the dough. Gather the scraps and continue to roll out and cut until you've used all the dough.",
            "Place the shapes on the prepared baking sheets.",
            "Bake the cookies for about 10 minutes, or until just golden around the edges.",
            "After cooling, dust the cookies with confectioner's sugar, if desired."
        ],
        "updatedInstructions": [
            "Line two baking sheets with parchment.",
            "Combine the butter and salt in the bowl of a stand mixer and cream together until soft and fluffy.",
            "Mix in the confectioner's sugar and lemon zest.",
            "Add the flour and mix until well combined.",
            "Transfer the dough to a lightly floured surface and pat it into a disc about 1-inch thick. Wrap the disc and chill for about 15 minutes, or until cool but not firm.",
            "Preheat the oven to 350 Fahrenheit.",
            "On a lightly floured surface, roll the dough to about 1/4-inch thick.",
            "Using a 2-inch round cutter, cut shapes from the dough. Gather the scraps and continue to roll out and cut until you've used all the dough.",
            "Place the shapes on the prepared baking sheets.",
            "Bake the cookies for about 10 minutes, or until just golden around the edges.",
            "After cooling, dust the cookies with confectioner's sugar, if desired."
        ],
        "amount": "Yields 3 dozen cookies",
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
        var totals = [];

        result.forEach(recipe => {
            var cookbook = totals.find(function(total) {
                return total.title === recipe.originalTitle;
            });

            if (!cookbook) {
                cookbook = {
                    title: recipe.originalTitle,
                    numberOfRecipes: 0,
                    completedRecipes: 0,
                    inProgressRecipes: 0
                };

                totals.push(cookbook);
            }

            cookbook.numberOfRecipes++;

            if (/\*\s*$/.test(recipe.name)) {
                    cookbook.inProgressRecipes++;
                } else {
                    cookbook.completedRecipes++;
                }
        });

        totals.forEach(cookbook => {
            console.log(cookbook)
        })
    })
} else {
    recipe.save().then(result => {
        console.log(`added recipe to the database`)
        mongoose.connection.close()
    })
}

module.exports = mongoose.model('Recipe', recipeSchema)