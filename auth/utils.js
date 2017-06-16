
function ensuredLoggedIn(redirectPath){
    return function (req,res,next) {
        if(!req.user){
            res.redirect(redirectPath);
        }
        else{
            next();
        }
    }
}

module.exports ={
    eli: ensuredLoggedIn
}