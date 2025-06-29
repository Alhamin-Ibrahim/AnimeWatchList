import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String, 
        required: true
    },
    password:{
        type: String, // hashed
        required: true
    },
    watchlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime'
    }]
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

export default User;