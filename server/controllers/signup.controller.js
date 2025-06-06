import User from '../models/user.model.js';
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
    const {username, email, password} = req.body;

    const user_email = await User.findOne({email});

    if(user_email) return res.status(400).json({message: 'Email already taken'});

    const user = await User.findOne({username});

    if(user) return res.status(400).json({message: 'Username already taken'});

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({username, email, password:hashed});
  
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log("Error in creating user", error.message)
      res.status(500).json({ success: false,  message: 'Server error'});
    }
  }