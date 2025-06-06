import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    status:{
        type: String, // Watching, Completed, Plan to watch, Dropped
        required: true
    },
    episodewatched:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const Anime = mongoose.model('Anime', animeSchema);

export default Anime;