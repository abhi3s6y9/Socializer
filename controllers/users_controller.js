const User = require('../models/user');

module.exports.profile = async function(req, res){
    // res.end('<h1>User Profile</h1>');
    let user = await User.findById(req.user)
        if(user){
            return res.render('user_profile', {
                title: "Users Profile",
                user: user
            });
        }
}

// render the sign in page
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('sign_in', {
        title: "Sign In"
    });
}

// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('sign_up', {
        title: "Sign Up"
    });
}


// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then((user) => {
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
    })
    .catch((err) => {
        console.log("Error in finding user in signing up");
        return;
    });

}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}
