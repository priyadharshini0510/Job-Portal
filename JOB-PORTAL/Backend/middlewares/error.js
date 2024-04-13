class ErroHandler extends Error{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "CaseError") {
        const message = `Resource doesnt not found. Invlaid ${err.path}`;
        err = new ErroHandler(message, 400);
    }
}