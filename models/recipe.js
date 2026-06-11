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
        "title": "taste-and-technique",
        "originalTitle": "Taste & Technique",
        "name": "Mom's Simple Salad*",
        "summary": [
            "This is one of the most important recipes in this book, and it's hardly a recipe at all. It is the salad my mom made almost every night of my childhood. She used red leaf or butter lettuce and topped it with green onions, celery, carrots, tomatoes, and anything else that was ready in our little backyard garden. The dressing uses cheap red wine vinegar and olive oil; I've made it with good vinegar and it just doesn't taste the way I remember. I can trace my obsession with balance directly back to this salad. It's perfect next to the soufflés my mom and I made when I was growing up - the salad is fresh, crunchy, and acidic; the soufflé is eggy, fluffy, and mild. I liked to alternate bites to keep my palate interested. To this day, I would never not have a salad on the table for my family. A meal without it just doesn't seem complete."
        ],
        "ingredients": [
            "Dressing:",
            "6 tablespoons extra-virgin olive oil",
            "2 tablespoons plus 1/2 teaspoons inexpensive red wine vinegar",
            "2 teaspoons lemon juice",
            "1/2 teaspoon salt",
            "1/4 teaspoon freshly ground black pepper",
            "-----",
            "Salad:",
            "1 head red leaf lettuce",
            "1 or 2 carrots, peeled and sliced into bite-size pieces",
            "1 or 2 celery stalks, sliced into bite-sized pieces",
            "1/4 small red cabbage, thinly sliced",
            "2 green onions, green and light green parts only, thinly sliced",
            "2 small radishes, thinly sliced",
            "1 small or 1/2 large tomato, cut into bite-sized wedges",
            "1/8 teaspoon salt",
            "1/8 teaspoon freshly ground black pepper",
            "2 lemon wedges, seeded",
            "Edible flowers, for garnish (optional)"
        ],
        "originalInstructions": [
            "MAKE THE DRESSING: Combine the oil, vinegar, lemon juice, salt, and pepper in a small glass jar or plastic container with a tight-fitting lid and shake vigorously.",
            "MAKE THE SALAD: Trim off and discard about 1 inch from the root end of the head of lettuce. Separate the leaves, then wash and dry the lettuce.",
            "In a chilled mixing bowl, combine the lettuce and the prepared vegetables. Just before dressing the salad, sprinkle the greens and vegetables with the salt and pepper. Tilt the dressing container at a 45-degree angle, mix the dressing well with a large spoon, and ladle a few spoonfuls, making sure to get an even amount of vinegar and oil, along the perimeter of the salad. Mix in from the sides, gently tossing the whole thing with your hands. Taste for acidity and add a squeeze of juice from the lemon wedges and add more salt and pepper if necessary - finishing with proper seasoning is the key to a great salad. Garnish with the flowers and serve immediately."
        ],
        "updatedInstructions": [
            "MAKE THE DRESSING: Combine the oil, vinegar, lemon juice, salt, and pepper in a small glass jar or plastic container with a tight-fitting lid and shake vigorously.",
            "MAKE THE SALAD: Trim off and discard about 1 inch from the root end of the head of lettuce. Separate the leaves, then wash and dry the lettuce.",
            "In a chilled mixing bowl, combine the lettuce and the prepared vegetables. Just before dressing the salad, sprinkle the greens and vegetables with the salt and pepper. Tilt the dressing container at a 45-degree angle, mix the dressing well with a large spoon, and ladle a few spoonfuls, making sure to get an even amount of vinegar and oil, along the perimeter of the salad. Mix in from the sides, gently tossing the whole thing with your hands. Taste for acidity and add a squeeze of juice from the lemon wedges and add more salt and pepper if necessary - finishing with proper seasoning is the key to a great salad. Garnish with the flowers and serve immediately."
        ],
        "amount": "Serves 2",
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