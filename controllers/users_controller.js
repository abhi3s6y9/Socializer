const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1>User Profile</h1>');
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title: "Users Profile",
                    user: user
                });
            }
            else{
                return res.redirect('/users/sign-in');
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('sign_in', {
        title: "Sign In"
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title: "Sign Up"
    });
}


// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding user in signing up");
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("Error in creating user while signing up");
                    return;
                }

                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // TODO later
}
