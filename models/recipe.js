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
        "title": "step-by-step-instant-pot",
        "originalTitle": "The Step By Step Instant Pot Cookbook",
        "name": "Sticky Nashville Hot Chicken and Rice",
        "summary": "Oooo-EEEE! Nashville hot chicken takes classic fried chicken and amps the spice up to 11. Since the Instant Pot can't deep-fry, I created this seared chicken-and-rice dish with a sauce inspired by its umistakable spiciness. If you're not a fan of the extreme heat, feel free to take it easy on the spices - it'll still be delicious.",
        "ingredients": [
            "THE CHICKEN & RICE",
            "2 tablespoons vegetable oil",
            "2 tablespoons (1/4 stick) salted butter",
            "1 Vidalia (sweet) onion, diced",
            "2 pounds boneless, skinless chicken thighs, cut into bite-sized pieces",
            "6 cloves garlic, minced or pressed",
            "2 cups chicken broth, divided",
            "2 cups jasmine rice, rinsed and drained",
            "1 bunch scallions, thinly sliced",
            "-",
            "THE NASHVILLE HOT SAUCE",
            "2/3 cup hot sauce (Frank's RedHot)",
            "1/3 cup vegetable oil",
            "1 tablespoon brown sugar",
            "1 tablespoon cayenne pepper",
            "2 teaspoons smoked or sweet paprika",
            "1 teaspoon chili powder",
            "1 teaspoon garlic powder"
        ],
        "originalInstructions": [
            "On the Instant Pot, hit Saute and adjust so it's on More or High. Place the oil and butter in the pot. Once the butter has melted, add the onion and saucte until softened and just beginning to brown, 2-3 minutes.",
            "Add the chicken and garlic and saute for another 2-3 minutes, until the chicken has just begun to turn pinkish-white around the edges.",
            "Pour in 1/2 cup of the broth and scrape up the browned bits from the bottom of the pot with a wooden spoon. Add the rice and remaining broth and stir.",
            "Secure the lid, turn the valve to the sealing position, hit Keep Warm/Cancel and then Manual or Pressure Cook on High Pressure for 3 mionutes. When done, allow a 10-minutes natural release and finish with a quick release.",
            "Meanwhile, make the Nashville Hot Sauce by whisking together all the ingredients.",
            "When the pot's done, fluff the rice with a fork, add in the sauce, and mix well until the chicken and rice are coated. Top with scallions and serve."
        ],
        "updatedInstructions": [
            "On the Instant Pot, hit Saute and adjust so it's on More or High. Place the oil and butter in the pot. Once the butter has melted, add the onion and saucte until softened and just beginning to brown, 2-3 minutes.",
            "Add the chicken and garlic and saute for another 2-3 minutes, until the chicken has just begun to turn pinkish-white around the edges.",
            "Pour in 1/2 cup of the broth and scrape up the browned bits from the bottom of the pot with a wooden spoon. Add the rice and remaining broth and stir.",
            "Secure the lid, turn the valve to the sealing position, hit Keep Warm/Cancel and then Manual or Pressure Cook on High Pressure for 3 mionutes. When done, allow a 10-minutes natural release and finish with a quick release.",
            "Meanwhile, make the Nashville Hot Sauce by whisking together all the ingredients.",
            "When the pot's done, fluff the rice with a fork, add in the sauce, and mix well until the chicken and rice are coated. Top with scallions and serve."
        ],
        "amount": "Serves 4-6",
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