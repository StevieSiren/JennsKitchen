const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27017/GBwithJenn");
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/css', express.static(__dirname + '/css'));



// =======================================================================
// === RECIPE SCHEMA SETUP === //
// =======================================================================

var recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Recipe = mongoose.model("Recipe", recipeSchema);

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



// =======================================================================
// === INDEX: MAIN ROUTES === //
// =======================================================================

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/recipes', (req, res) => {
    // Get all recipes from database
    Recipe.find({}, (err, allRecipes) => {
        if(err) {
            console.log(err);
        } else {
            res.render('recipes', {
                recipes: allRecipes
            });
        }
    });
});


// =======================================================================
// === CREATE/NEW: ADDING NEW RECIPE === //
// =======================================================================

app.post('/recipes', (req, res) => {
    // get data and add to recipes array
    var name = req.body.name,
        image = req.body.image,
        description = req.body.description;

    var newRecipe = {name: name, image: image, description: description};
    // Create new recipe and save to database
    Recipe.create(newRecipe, (err, createdRecipe) => {
        if(err) {
            console.log('Uh oh, you done messed up.');
        } else {
            res.redirect('/recipes');
        }
    });   
    // redirect to recipes page // default redirect is to GET route
});


app.get('/recipes/new', (req, res) => {
    res.render('new-recipe.ejs');
});


// =======================================================================
// === SHOW: SHOW SELECTED RECIPE === //
// =======================================================================

app.get('/recipes/:id', (req, res) => {
    // Find recipe with the provided ID
    var id = req.params.id;
    Recipe.findById(id, (err, foundRecipe) => {
        if(err) {
            console.log(err);
        } else {
            res.render('show-recipe', {
                recipe: foundRecipe
            });
        }
    });
});


// =======================================================================
// === STARTING THE SERVER ON PORT 3000 === //
// =======================================================================

app.listen(3000, () => {
    console.log('Firing up the stove!');
});