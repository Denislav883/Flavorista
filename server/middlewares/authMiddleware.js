import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decodedToken;

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
}