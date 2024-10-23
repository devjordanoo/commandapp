interface IError {
    message: string
}

class ErrorRequester {
    _message: string
    constructor(err: IError) {
        this._message = err.message;
    }
}

export { ErrorRequester }