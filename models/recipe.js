const mongoose = require('mongoose');

// =======================================================================
// === RECIPE SCHEMA SETUP === //
// =======================================================================


var recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// var Recipe = mongoose.model("Recipe", recipeSchema);

// Recipe.create({
//     name: 'Bananas for Pancakes',
//     image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     description: 'A delightful, fluffy stack of banana pancakes.'
// }, (err, recipe) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(recipe);
//     }
// });

module.exports = mongoose.model('Recipe', recipeSchema);