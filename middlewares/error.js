class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    if (err.code === 11) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpredError") {
        const message = `Json Web Token Is Expired. Try To Login!`;
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "castError") {
        const message = `Invalid  ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    const errorMessage = err.erross ? Object.values(err.errors).map(error => error.message).join("") : err.message;

    return res.status(err.statusCode).json({
        success:false,
        message: errorMessage,
    })
};


export default ErrorHandler;