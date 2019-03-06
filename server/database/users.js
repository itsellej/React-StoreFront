const login = (request, response) => {
    response.status(200).json("login")
}

const signup = (request, response) => {
    response.status(200).json("signup")
}
module.exports = { login, signup }