

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            console.error('AsyncHandler caught error:', err);
            next(err);
        })
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    console.error('Global error handler:', err);
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    console.error('Request URL:', req.originalUrl);
    console.error('Request method:', req.method);

    // Ensure response hasn't been sent already
    if (res.headersSent) {
        return next(err);
    }

    // Handle different error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            msg: "Validation Error",
            error: err.message,
            details: err.details
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            msg: "Invalid ID format",
            error: "Please provide a valid ID"
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            msg: "Duplicate field value",
            error: "This value already exists"
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            msg: "Invalid token",
            error: "Please provide a valid token"
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            msg: "Token expired",
            error: "Please login again"
        });
    }

    // Handle MongoDB connection errors
    if (err.name === 'MongoNetworkError' || err.name === 'MongoServerError') {
        return res.status(500).json({
            msg: "Database connection error",
            error: "Unable to connect to database"
        });
    }

    // Default error response - show actual error details for debugging
    res.status(err.statusCode || 500).json({
        msg: "error",
        error: err.message,
        name: err.name,
        code: err.code,
        ...(process.env.NODE_ENV !== 'production' && {
            stack: err.stack
        })
    });
}