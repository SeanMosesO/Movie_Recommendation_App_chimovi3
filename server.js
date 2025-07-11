import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
    autoRemove: "native",
    ttl: 60 * 60 // 1 hour
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Routes
import signup from "./routes/signup_route.js";
import login from "./routes/login_route.js";
import getProfile from "./routes/get_profile.js";
import updateProfile from "./routes/updateProfile.js";
import logout from "./routes/logout.js";
import deleteAccount from "./routes/deleteAccount.js";
import addToFavorites from "./routes/add_favorites.js";
import createWatchlist from "./routes/create_watchlist.js";
import addToWatchlist from "./routes/add_to_watchlist.js";
import getMovies from "./routes/get_movies.js";

app.get("/", (req, res) => {
  res.send("Welcome to the Movie Recommendation App API");
});

app.use("/api/auth", signup);
app.use("/api/auth", login);
app.use("/api/user", getProfile);
app.use("/api/user", updateProfile);
app.use("/api/user", logout);
app.use("/api/user", deleteAccount);
app.use("/api/favorites", addToFavorites);
app.use("/api/watchlist", createWatchlist);
app.use("/api/watchlist", addToWatchlist);
app.use("/api", getMovies);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// DB and Server startup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}).catch(err => {
  console.error("MongoDB connection failed:", err.message);
});
