module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Socializer</h1>');

    return res.render('home', {
        title: "This is my title of home page"
    });
}