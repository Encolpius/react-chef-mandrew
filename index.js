const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))
import { useParams } from 'react-router-dom'
const { id } = useParams()
let cookbook = [
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
        "instructions": {
            "original": [
            "Preheat the oven to 425 degrees. Line a baking sheet with parchment paper.",
            "Combine the flours, salt, baking powder, and baking soda in the bowl of a food processor and pulse a few times to blend. Add the chilled butter and pulse several times, until the pieces of butter are no bigger than small peas. Do not overprocess; the dough should not come together.",
            "Transfer the dough to a large bowl and make a well in the center of the flour mixture. Pour in the buttermilk. Stir and lift the mixture with a sturdy spoon, gently working the flour into the buttermilk. The dough should begin to come together but not form a solid mass, or the biscuits may be tough.",
            "Dust a work surface with flour and turn out the dough. Pat the dough into a 3/4-inch-thick rectangle. Using a 2.5-inch round cutter, cut out the biscuits. (If the cutter sticks to the dough, dip the cutter in flour before cutting.) Place the biscuits on the baking sheet. The dough trimmings can be gently pushed together, patted out, and cut one more time; do not overwork the dough.",
            "Brush the tops of the dough lightly with buttermilk. Bake for 15 to 18 minutes, rotating the pan halfway through baking, until a rich golden brown. As soon as you remove the biscuits from the oven, brush the tops with melted butter. Serve warm."
            ],
            "updated": [
            "Preheat the oven to 425 degrees. Line a baking sheet with parchment paper. Place the butter cut into cubes in the freezer.",
            "Combine the flours, salt, baking powder, and baking soda in the bowl of a food processor and pulse a few times to blend. Add the chilled butter and pulse 5 times, holding one second per pulse, until the pieces of butter are no bigger than small peas. The dough should not come together.",
            "Transfer the dough to a large bowl and make a well in the center of the flour mixture. Pour in the buttermilk. Makre sure to empty all the buttermilk into the well. Stir and lift the mixture with a sturdy spoon, gently working the flour into the buttermilk. The dough should begin to come together but not form a solid mass, or the biscuits may be tough.",
            "Dust a work surface with flour and turn out the dough. Pat the dough into a 3/4-inch-thick rectangle; do not knead. Divide into four and stack each square on top of each other; use a rolling pin to gently roll out into a rectangle again about 2 inches tall",
            "Set aside a small bowl of flour. Using a 2.5-inch round cutter, cut out the biscuits; if the cutter sticks to the dough, dip the cutter in flour before cutting. Place the biscuits on the baking sheet. The dough trimmings can be gently pushed together, patted out, and cut one more time",
            "Brush the tops of the dough lightly with buttermilk. Bake for 15 to 18 minutes, rotating the pan halfway through baking, until a rich golden brown. As soon as you remove the biscuits from the oven, brush half the tops with melted butter; Alexi prefers several to not have the additional butter. Add fleur de sel salt, if desired. Serve warm."
            ]
        },
        "amount": "Makes 12 biscuits",
        "id": 1,
    },
    {
        "name": "Corn on the Cob with Lime Salt",
        "summary": "",
        "ingredients": [
            "6 ears supersweet white or yellow corn, shucked",
            "6 tablespoons (3 ounces) unsalted butter, cut into pieces, at room temperature",
            "Lime Salt",
            "2 tablespoons finely chopped chives"
        ],
        "instructions": {
            "original": [
                "Cut both ends off each ear of corn, and cut the ears in half.",
                "Bring a large pot of well-salted water to a boil. Add the corn and cook for 5 to 7 minutes, or until the corn is tender.",
                "Meanwhile, transfer about 2 tablespoons of the cooking water to a large wide heatproof bowl. Add the butter and swirl the bowl over the heat to emulsify. Add lime salt to taste, swirling the bowl to maintain the emulsification. Set aside in a warm spot.",
                "Drain the corn well and add it to the butter. Sprinkle in the chives. Swirl the bowl to coat the corn evenly. Sprinkle with additional lime salt, and serve the remaining salt on the side."
            ],
            "updated": [
                "Cut both ends off each ear of corn, and cut the ears in half. Cutting the ears of corn takes longer than you would expect.",
                "Bring a large pot of water to a boil and add one tablespoon of salt. Add the corn and cook for 5 to 7 minutes, or until the corn is tender.",
                "Meanwhile, transfer about 2 tablespoons of the cooking water to a large wide heatproof bowl. Add the butter and swirl the bowl over the heat to emulsify. Add lime salt to taste, swirling the bowl to maintain the emulsification. Set aside in a warm spot.",
                "Drain the corn well and add it to the butter. Sprinkle in the chives. Swirl the bowl to coat the corn evenly. Sprinkle with additional lime salt, and serve the remaining salt on the side."
            ]
        },
        "amount": "Serves 6",
        "id": 2,
    },
    {
        "name": "Lime Salt",
        "summary": "",
        "ingredients": [
            "1/4 cup Maldon sea salt or fleur de sel",
            "Grated zest of one lime",
        ],
        "instructions": {
            "original": [
                "Put the salt and lime zest in a small jar. Put on the lid, and shake to combine. Extra salt can be stored in the freezer.",
            ],
            "updated": [
                "Use a microplane to grate the lime zest. Put the salt and lime zest in a small jar or container. Put on the lid, and shake to combine. Extra salt can be stored in the freezer.",
            ]
        },
        "amount": "Makes 1/4 cup",
        "id": 3,
    },
]

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/cookbooks', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html')); 
})

app.get('/about-me', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'about-me.html')); 
})

app.get('/api/ad-hoc', (request, response) => {
    response.json(cookbook)
})

app.get('/recipe/:id', (request, response) => {
    const recipe = cookbook.find(r => r.id === id)
    response.json(recipe)
})

app.get('/api/ad-hoc/:id', (request, response) => {
    const id = request.params.id
    const recipe = cookbook.find(recipe => recipe.id === id)
    recipe ? response.json(note) : response.status(404).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})