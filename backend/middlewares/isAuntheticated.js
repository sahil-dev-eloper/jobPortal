import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies.token;
   
    console.log("Auth Header:", authHeader);
    console.log("Cookie Token:", cookieToken);

    // Try to get token from authorization header first, then from cookies
    let token = null;
    
    if (authHeader) {
        token = authHeader.startsWith('Bearer ') 
            ? authHeader.split(" ")[1] 
            : authHeader;
    } else if (cookieToken) {
        token = cookieToken;
    }
    
    console.log("Extracted Token:", token);

    // Check if token is missing or is literally "null" or "undefined" as strings
    if (!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({
            message: 'User not authenticated - please login first',
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({
            message: 'Invalid or expired token',
            success: false
        });
    }
};

export default isAuthenticated;
