import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = (req, res, next) => {
    const session = req.session?.user;

    if (!session) {
        return res.status(401).json({ message: "No active session. Please log in." });
    }

    const token = session.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token found in session or headers." });
    }

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined");
        return res.status(500).json({ message: "Internal server error" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default isAuthenticated;
