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
        "title": "the-food-lab",
        "originalTitle": "The Food Lab",
        "name": 'Diner-Style Ham and Cheese Omelet',
        "summary": [
            "It's important to cook fillings without cheese before you add them to the eggs, or they will not heat up enough while the omelet cooks. Then tossing the cheese with the cooked filling will help it get started melting, so that it's nice and gooey by the time the omelet is done, without the need to overcook your eggs."
        ],
        "ingredients": [
            "5 large eggs",
            "3/4 teaspoon kosher salt",
            "1/4 teaspoon freshly ground black pepper",
            "2 tablespoons unsalted butter",
            "4 ounces ham steak, diced",
            "2 ounces cheddar cheese, grated"

        ],
        "originalInstructions": [
            "Combine the eggs, salt, and pepper in a medium bowl and whisk until homoegenous and frothy, about 1 minute. Allow to rest at room temperature for at least 15 minutes. The eggs should darken in color significantly.",
            "Meanwhile, melt 1 tablespoon of the butter in a 10-inch nonstick skillet and cook until lightly browned. Add the ham and cook, stirring frequently, until it has begun to brown on the edges, about 3 minutes. Transfer the ham to a small bowl, add the cheese, and toss to combine. Wipe out the skillet with a paper towel and return it to medium heat.",
            "Add the remaining tablespoon of butter to the pan and cook until lightly browned. Rewhisk the eggs until foamy, then add to the skillet and cook, using a silicone sptaula to push the eggs in toward the center as they set and tilting the pan to spread the uncooked egg underneath. Continue pushing in the edges of the eggs and tilting the skillet, working all around the pan, until the omelet is almost set, about 45 seconds. Sprinkle the ham and cheese over half the omelet, remove from the heat, cover, and let the omelet sit until it reaches the desired consistency, about 1 minute.",
            "Using the silicone spatula, loosen the edges of the omelet from the skillet and shake the skillet to ensure that it's not stuck. Carefully fold the omelet in half, then slide it onto a serving plate and serve immediately."
        ],
        "updatedInstructions": [
            "Combine the eggs, salt, and pepper in a medium bowl and whisk until homoegenous and frothy, about 1 minute. Allow to rest at room temperature for at least 15 minutes. The eggs should darken in color significantly.",
            "Meanwhile, melt 1 tablespoon of the butter in a 10-inch nonstick skillet and cook until lightly browned. Add the ham and cook, stirring frequently, until it has begun to brown on the edges, about 3 minutes. Transfer the ham to a small bowl, add the cheese, and toss to combine. Wipe out the skillet with a paper towel and return it to medium heat.",
            "Add the remaining tablespoon of butter to the pan and cook until lightly browned. Rewhisk the eggs until foamy, then add to the skillet and cook, using a silicone sptaula to push the eggs in toward the center as they set and tilting the pan to spread the uncooked egg underneath. Continue pushing in the edges of the eggs and tilting the skillet, working all around the pan, until the omelet is almost set, about 45 seconds. Sprinkle the ham and cheese over half the omelet, remove from the heat, cover, and let the omelet sit until it reaches the desired consistency, about 1 minute.",
            "Using the silicone spatula, loosen the edges of the omelet from the skillet and shake the skillet to ensure that it's not stuck. Carefully fold the omelet in half, then slide it onto a serving plate and serve immediately."
        ],
        "amount": "Makes 1 large omelet, serving 2",
        "recipeId": 11,
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