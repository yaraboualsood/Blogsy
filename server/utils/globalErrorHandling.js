

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

    // Default error response
    res.status(err.statusCode || 500).json({
        msg: "error",
        error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
}