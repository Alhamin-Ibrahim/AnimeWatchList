import User from '../models/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signin = async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) return res.status(400).json({message: 'Invalid email'})
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid password"});

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })

    res.json({token, username: user.username});
  }