import mongoose from 'mongoose';
import Anime from '../models/anime.model.js';
import User from '../models/user.model.js';

export const getAnimes = async (req,res) => {
    try {
        const animes = await User.findById(req.userId).populate('watchlist');
        res.status(200).json({success: true, data: animes})
    } catch (error) {
        res.status(500).json({success: false, message: "Couldn't retreive animes"})
    }
  }

export const addAnime = async (req, res) => {
    const {title, status, episodewatched, image} = req.body;
  
    try {
        const newAnime = new Anime({ title, status, episodewatched, image });
        await newAnime.save();
        const user = await User.findById(req.userId)
        user.watchlist.push(newAnime._id)
        await user.save();
        res.json({message: 'Anime added to watchlist'})
    } catch (error) {
        res.status(500).json({ message: 'Failed to add anime', error: error.message });
    }
  }

export const deleteAnime = async (req, res) => {
    const { id } = req.params;

    try{
        await Anime.findByIdAndDelete(id);
        const user = await User.findById(req.userId)
        await User.findByIdAndUpdate(
            req.userId,
            { $pull: { watchlist: id } }
          );
        res.status(200).json({ success: true, message: "Anime removed"});
    }catch (error) {
        res.status(500).json({status: false, message: "Anime not found"});
    }
  }

export const updateAnime = async (req, res) => {
    const { id } = req.params;

    const {title, status, episodewatched, image} = req.body;
    const user = await User.findById(req.userId);

    if(!user.watchlist.includes(id)){
        return res.status(404).json({success: false, message: "Invalid AnimeId"})
    }

    try {
        const updateAnime = await Anime.findByIdAndUpdate(id, {title, status, episodewatched, image}, {new:true});
        res.status(200).json({success: true, data: updateAnime})
    } catch (error) {
        res.status(500).json({success:false, message: "Couldn't update"})
    }
  }