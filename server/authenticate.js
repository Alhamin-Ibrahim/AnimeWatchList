import jwt from 'jsonwebtoken';


export default function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({message: "Auth is missing"})
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            next();
          } catch (err) {
            res.status(403).json({ message: 'Invalid token' });
          }
  }