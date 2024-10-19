

module.exports = (req,res,next) => {
    if (req.path.startsWith('/api')){
        next()
    }else{
        if( req.path/*静态资源存在*/){
            res.send("静态资源")
        }else{
            next()
        }
    }
}