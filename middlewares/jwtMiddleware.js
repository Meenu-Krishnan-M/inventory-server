const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');

    const token = req.headers["authorization"].split(' ')[1]
    console.log(token);

    if(token){
        try {
            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
            console.log(jwtResponse);
            req.username = jwtResponse.username
           next()
    
        } catch(error){
            res.status(401).json(`AUTHORIZATION FAILED DUE TO ${error}`)
        }
    }else{
        res.status(404).json("Authorization failed...Token is missing!!!")
    }
}
module.exports = jwtMiddleware