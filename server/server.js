import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import path from 'path'
import watchlistRoutes from './routes/watchlist.route.js'
import signupRoutes from './routes/signup.route.js'
import signinRoutes from './routes/signin.route.js'

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5001

const __dirname = path.resolve()

app.use('/api/signup', signupRoutes)
app.use('/api/signin', signinRoutes)
app.use('/api/watchlist', watchlistRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("/*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client" ,"dist", "index.html"));
    })
}
  
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})