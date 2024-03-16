import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
 }, {timestamps: true})  //to save time of creation and updation of user in DB

 const User = mongoose.model('User' , userSchema)
 export default User;