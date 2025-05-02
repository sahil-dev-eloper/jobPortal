import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY); // no need for `await`

        req.id = decode.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token',
            success: false
        });
    }
};

export default isAuthenticated;
