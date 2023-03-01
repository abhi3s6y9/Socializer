module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Socializer</h1>');

    // console.log(req.cookies);
    // res.cookies('user_id', 25);
    return res.render('home', {
        title: "This is the title of my home page"
    });
}