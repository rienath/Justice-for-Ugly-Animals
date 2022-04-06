import jwt from "jsonwebtoken";

// Middleware that checks if user has a token and gets the data out it
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decodedData?._id;
        req.username = decodedData?.username
        req.privilege = decodedData?.privilege
        next();
    } catch (error) {
        // TODO should there be some return to user?
        console.log(error);
    }
};

export default auth;