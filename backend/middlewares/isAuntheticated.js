import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: 'User not authenticated',
            success: false
        });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token); // 👈 Add this

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error); // 👈 Add this
        return res.status(401).json({
            message: 'Invalid or expired token',
            success: false
        });
    }
};

export default isAuthenticated;
