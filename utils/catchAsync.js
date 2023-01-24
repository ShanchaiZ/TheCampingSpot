//Wrapper Function that replaces all try/catch errors in Async error handling:

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}