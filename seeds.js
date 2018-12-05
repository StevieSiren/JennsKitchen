const mongoose = require('mongoose');

const Recipe = require('./models/recipe'),
      Comment = require('./models/comment');

var data = [
    {   
        name: 'Bananas for Pancakes', 
        image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description: 'I am absolutely bananas for pancakes!'
    },
    {   
        name: 'Choco Mounds', 
        image: 'https://images.unsplash.com/photo-1534492652479-14861a759d2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1038&q=80',
        description: 'The best cookies you\'ve ever tasted'
    },
    {   
        name: 'Blueberry Say Cheese-cake', 
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description: 'The name says it all...'
    }
];

function seedDB() {
    // Remove all recipes
    Recipe.remove({}, (err) => {
        if(err) {
            console.log('There was an error!');
            console.log(err);
        } else {
            console.log('Removed all Recipes');
        }
    });

    // Add some recipes
    data.forEach((dataSeed) => {
        Recipe.create(dataSeed, (err, recipe) => {
            if(err) {
                console.log(err);
            } else {
                console.log('New recipe added to DB');
                // Create a comment
                Comment.create({
                    text: 'This is a test comment',
                    author: 'Sarah Marshall'
                }, (err, comment) => {
                    if(err) {
                        console.log(err);
                    } else {
                        recipe.comments.push(comment);
                        recipe.save();
                        console.log('Created new comment!');
                    }
                });
            }
        });
    });
    
};

module.exports = seedDB;
