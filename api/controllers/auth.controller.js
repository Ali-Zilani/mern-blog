import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next)=>{
    //console.log(req.body)
    const {username,email,password} = req.body ;

    if(!username || !email || !password || username==='' || email==='' || password===''){
       // return res.status(400).json({message: 'All fields are reqiured'}) // client side error
       return  next(errorHandler(400,'All fields are required'))
    }

    // hashing the password
    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser = new User({ 
        // after ES6 if key and value are similar then we can write like this 
        username,
        email,
        password: hashedPassword
    })

    try{
        await newUser.save(); // save to DB
        res.status(200).json({message: 'signup successfull'})
    }
    catch(err){ // server side error
        next(err) // using middleware to handle error
        //res.status(500).json({message:`Error in user signup ${err}`})
    }
};


export const signin = async (req, res, next) =>{
    const {email, password} = req.body ;

    if(!email || !password || email === '' || password === '' ){
        return next(errorHandler(400,'All fields are required'))
    }

    try{
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(404,'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(400,'Invalid Password'))
        }
        // to get info about user without password info
        const {password:pass, ...rest} = validUser._doc;

        // authenctication using jsonwebtoken lirary as jwt
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        res.status(200).cookie('access_token',token,{
            httpOnly:true}).json(rest)
    }
    catch(err){
        next(err);
    }
}