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
        "title": "flour-water-salt-yeast",
        "originalTitle": "Flour, Water, Salt, Yeast",
        "name": 'The Saturday White Bread',
        "summary": [
            "This recipe is designed for someone who wants to make good, crusty loaves of white bread from start to finish in one day. Mix the dough first thing in the morning, shape it into two loaves about 5 hours later, and then bake in the late afternoon in time for dinner. It's also a good first recipe to try from this book to help you get familiar with my dough handling techniques, which are the same for all the recipes in this book. Here you get the taste-good benefits of a medium-length fermentation, resulting in a versatile, delicious bread that's great as a dinner bread and also works well for sandwiches and toast.",
            "Sometimes I like to make this bread with 10 percent whole wheat flour for the round, earthy flavors it adds. If you want to do that, simply make this recipe with 900 grams of white flour and 100 grams of whole wheat flour.",
            "You can bake one or two loaves from this recipe. If you bake just one loaf, you can divide the remaining dough into two or three dough balls to make iron-skillet focaccia or pizza; refrigerate the dough balls and use them at any time during the next two or three days. I love focaccia with olive oil, salt, pepper, and maybe a sprinkling of herbs, cut into small pieces to share with friends before dinner, or just for snacks. "
        ],
        "ingredients": [
            "1,000g white flour",
            "720g water, 90 to 95 degrees fahrenheit",
            "21g fine sea salt",
            "4g instant dried yeast"
        ],
        "originalInstructions": [
            "AUTOLYZE: Combine the 1,000 grams of flour with the 720 grams of 90 to 95-degree fahrenheit water in a 12-quart round tub or similar container. Mix by hand until just incorporated. Cover and let rest for 20 to 30 minutes.",
            "MIX: Sprinkle the 21 grams of salt and the 4 grams (1 level teaspoon) of yeast evenly over the top of the dough. Mix by hand, wetting your working hand before mixing so the dough doesn't stick to you. (It's fine to rewet your hand three or four times while you mix.) Reach underneath the dough and grab about one-quarter of it. Gently stretch this section of dough and fold it over the top of the other side of the dough. Repeat three more times with the remaining dough, until the salt and yeast are fully enclosed.",
            "Use the pincer method to fully integrate the ingredients. Make five or six pincer cuts across the entire mass of the dough. Then fold the dough over itself a few times. Repeat, alternately cutting and folding until all of the ingredients are fully integrated and the dough has some tension to it. Let the dough rest for a few minutes, then fold for another 30 seconds or until the dough tightens up. The whole process should take about 5 minutes. The target dough temperature at the end of the mix is 77 to 78 fahrenheit. Cover the tub and let the dough rise.",
            "FOLD: This dough needs two folds. It's easiest to apply the folds during the first 1 1/2 hours after mixing the dough. Apply the first fold about 10 minutes after mixing and the second fold during the next hour (when you see the dough spread out in the tub, it's ready for the second fold). If need be, it's okay to fold later; just be sure to leave it alone for the last hour of rising. When the dough is triple its original volume, about 5 hours after mixing, it's ready to be divided.",
            "DIVIDE: Moderately flour a work surface about two feet wide. Flour your hands and sprinkle a bit of flour around the edges of the tub. Tip the tub slightly and gently work your floured free hand beneath the dough to loosen it from the bottom of the tub. Gently ease the dough out onto the work surface without pulling or tearing it.",
            "With floured hands, pick up the dough and ease it back down onto the work surface in a somewhat even shape. Dust the area in the middle, where you'll cut the dough, with a bit of flour. Cut the dough into two equal-sized pieces with a dough knife or plastic dough scraper.",
            "SHAPE: Dust two proofing baskets with flour. Shape each piece of dough into a medium-tight ball. Place each seam-side down in its proofing basket.",
            "PROOF: Lightly flour the tops of the loaves. Set them side by side and cover with a kitchen towel, or place each basket in a nonperforated plastic bag.",
            "Plan on baking the loaves about 1 1/4 hours after they are shaped, assuming a room temperature of 70 degrees. If your kitchen is warmer, they will be optimally proofed in about 1 hour. Use the finger-dent test to determine when they are perfectly proofed and ready to bake, being sure to check the loaves after 1 hour. With this bread, 15 minutes can make the different between being perfectly proofed and collapsing a bit.",
            "PREHEAT: At least 45 minutes prior to baking, put a rack in the middle of the oven and put 2 Dutch ovens on the rack with their lids on. Preheat the oven to 475 degrees fahrenheit. If you only havbe 1 Dutch oven, put the second loaf in the refrigerator about 20 minutes before baking the first loaf and bake the loaves sequentially, giving the Dutch oven a 5-minute reheat after removing the first loaf. Alternatively, you can keep the second loaf in the refrigerator over night, in its proofing basket inside a nonperforated plastic bag, and bake it early the next morning. If you do this, put the second loaf in the refrigerator immediately after shaping.",
            "BAKE: For the next step, please be careful not to let your hands, fingers, or forearms touch the extremely hot Dutch oven.",
            "Invert the proofed loaf onto a lightly floured countertop, keeping in mind that the top of the loaf will be the side that was facing down while rising - the seam side. Use ove mitts to remove the preheated Dutch oven from the oven. Remove the lid. Carefully place the loaf in the hot Dutch oven seam side up. Use mitts to replace the lid, then put the Dutch oven back in the oven. Maintain the temperature at 475 degrees fahrenheit.",
            "Bake for 30 minutes, then carefully remove the lid and bake for about 20 more minutes, until at least medium dark brown all around the loaf. Check after 15 minutes of baking uncovered in case your oven runs hot.",
            "Remove the Dutch oven and carefully tilt it to turn the loaf out. Let cool on a rack or set the loaf on its side so air can circulate around it. Let the loaf rest for at least 20 minutes before slicing."
        ],
        "updatedInstructions": [
            "AUTOLYZE: Combine the 1,000 grams of flour with the 720 grams of 90 to 95-degree fahrenheit water in a 12-quart round tub or similar container. Mix by hand until just incorporated. Cover and let rest for 20 to 30 minutes.",
            "MIX: Sprinkle the 21 grams of salt and the 4 grams (1 level teaspoon) of yeast evenly over the top of the dough. Mix by hand, wetting your working hand before mixing so the dough doesn't stick to you. (It's fine to rewet your hand three or four times while you mix.) Reach underneath the dough and grab about one-quarter of it. Gently stretch this section of dough and fold it over the top of the other side of the dough. Repeat three more times with the remaining dough, until the salt and yeast are fully enclosed.",
            "Use the pincer method to fully integrate the ingredients. Make five or six pincer cuts across the entire mass of the dough. Then fold the dough over itself a few times. Repeat, alternately cutting and folding until all of the ingredients are fully integrated and the dough has some tension to it. Let the dough rest for a few minutes, then fold for another 30 seconds or until the dough tightens up. The whole process should take about 5 minutes. The target dough temperature at the end of the mix is 77 to 78 fahrenheit. Cover the tub and let the dough rise.",
            "FOLD: This dough needs two folds. It's easiest to apply the folds during the first 1 1/2 hours after mixing the dough. Apply the first fold about 10 minutes after mixing and the second fold during the next hour (when you see the dough spread out in the tub, it's ready for the second fold). If need be, it's okay to fold later; just be sure to leave it alone for the last hour of rising. When the dough is triple its original volume, about 5 hours after mixing, it's ready to be divided.",
            "DIVIDE: Moderately flour a work surface about two feet wide. Flour your hands and sprinkle a bit of flour around the edges of the tub. Tip the tub slightly and gently work your floured free hand beneath the dough to loosen it from the bottom of the tub. Gently ease the dough out onto the work surface without pulling or tearing it.",
            "With floured hands, pick up the dough and ease it back down onto the work surface in a somewhat even shape. Dust the area in the middle, where you'll cut the dough, with a bit of flour. Cut the dough into two equal-sized pieces with a dough knife or plastic dough scraper.",
            "SHAPE: Dust two proofing baskets with flour. Shape each piece of dough into a medium-tight ball. Place each seam-side down in its proofing basket.",
            "PROOF: Lightly flour the tops of the loaves. Set them side by side and cover with a kitchen towel, or place each basket in a nonperforated plastic bag.",
            "Plan on baking the loaves about 1 1/4 hours after they are shaped, assuming a room temperature of 70 degrees. If your kitchen is warmer, they will be optimally proofed in about 1 hour. Use the finger-dent test to determine when they are perfectly proofed and ready to bake, being sure to check the loaves after 1 hour. With this bread, 15 minutes can make the different between being perfectly proofed and collapsing a bit.",
            "PREHEAT: At least 45 minutes prior to baking, put a rack in the middle of the oven and put 2 Dutch ovens on the rack with their lids on. Preheat the oven to 475 degrees fahrenheit. If you only havbe 1 Dutch oven, put the second loaf in the refrigerator about 20 minutes before baking the first loaf and bake the loaves sequentially, giving the Dutch oven a 5-minute reheat after removing the first loaf. Alternatively, you can keep the second loaf in the refrigerator over night, in its proofing basket inside a nonperforated plastic bag, and bake it early the next morning. If you do this, put the second loaf in the refrigerator immediately after shaping.",
            "BAKE: For the next step, please be careful not to let your hands, fingers, or forearms touch the extremely hot Dutch oven.",
            "Invert the proofed loaf onto a lightly floured countertop, keeping in mind that the top of the loaf will be the side that was facing down while rising - the seam side. Use ove mitts to remove the preheated Dutch oven from the oven. Remove the lid. Carefully place the loaf in the hot Dutch oven seam side up. Use mitts to replace the lid, then put the Dutch oven back in the oven. Maintain the temperature at 475 degrees fahrenheit.",
            "Bake for 30 minutes, then carefully remove the lid and bake for about 20 more minutes, until at least medium dark brown all around the loaf. Check after 15 minutes of baking uncovered in case your oven runs hot.",
            "Remove the Dutch oven and carefully tilt it to turn the loaf out. Let cool on a rack or set the loaf on its side so air can circulate around it. Let the loaf rest for at least 20 minutes before slicing."
        ],
        "amount": "Makes 2 loaves.",
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