const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

const Recipe = require('./models/recipe'),
      seedDB = require('./seeds');

// Seed the database      
seedDB();

// =======================================================================
// === APP SETUP === //
// =======================================================================


mongoose.connect("mongodb://localhost:27017/GBwithJenn");
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));



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
    Recipe.findById(id).populate('comments').exec((err, foundRecipe) => {
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