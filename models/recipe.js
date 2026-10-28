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
        "title": "ad-hoc-at-home",
        "originalTitle": "Ad Hoc at Home",
        "name": "Honey Glazed Cipollini Onions*",
        "summary": [
            "Cipollini onions are milder than yellow or Spanish onions, and smaller, so they cook relatively quickly and can be served whole, two or three to a plate. They're also a sweeter onion, so you can serve them raw over salads, and roasting or sautéing them instensifies their sweetness. In this dish the sweetness is heightened by glazing. These are delicious with any grilled meats."
        ],
        "ingredients": [
            "1 3/4 pounds cipollini onions (about 14), about 2 inches in diameter",
            "1 tablespoon canola oil",
            "2 garlic cloves, lightly crushed, skin left on",
            "4 thyme sprigs",
            "1 tablespoon honey",
            "1/2 cup chicken stock",
            "Kosher salt and freshly ground black pepper"
        ],
        "originalInstructions": [
            "Preheat the oven to 400 Fahrenheit.",
            "Peel the onions. Cut the top of each onion to create a flat surface for browning. Trim the root ends. If any of the onions are noticeably larger than the rest, peel off an outer layer so they are closer in size.",
            "Heat an ovenproof frying pan large enough to hold the onions in a single layer over medium heat. Add the canola oil and heat until warm. Add the onions cut-side-down and cook until browned, swirling the pan from time to time for even browning, about 6 minutes. Turn and cook to lightly brown the second side, about 4 minutes. Add the garlic, thyme, and honey to the pan. The honey will bubble up; once it stops, add the chicken stock and swirl the pan to incorporate. Increase the heat to medium-high and bring just to a boil.",
            "Transfer to the oven and cook for 15 minutes, or until the onions are tender and the liquid has reduced to a thick glaze. Season to taste with salt and pepper.",
            "Transfer the onions to a serving dish and spoon the glaze over the top."
        ],
        "updatedInstructions": [
            "Preheat the oven to 400 Fahrenheit.",
            "Peel the onions. Cut the top of each onion to create a flat surface for browning. Trim the root ends. If any of the onions are noticeably larger than the rest, peel off an outer layer so they are closer in size.",
            "Heat an ovenproof frying pan large enough to hold the onions in a single layer over medium heat. Add the canola oil and heat until warm. Add the onions cut-side-down and cook until browned, swirling the pan from time to time for even browning, about 6 minutes. Turn and cook to lightly brown the second side, about 4 minutes. Add the garlic, thyme, and honey to the pan. The honey will bubble up; once it stops, add the chicken stock and swirl the pan to incorporate. Increase the heat to medium-high and bring just to a boil.",
            "Transfer to the oven and cook for 15 minutes, or until the onions are tender and the liquid has reduced to a thick glaze. Season to taste with salt and pepper.",
            "Transfer the onions to a serving dish and spoon the glaze over the top."
        ],
        "amount": "Serves 6",
        "recipeId": 15,
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