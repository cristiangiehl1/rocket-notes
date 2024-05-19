/*
    Devemos criar um objeto para criar as configs do nosso token JWT.

    Propriedade - expiresIn = tempo de expiração do token.
*/ 
module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default",
        expiresIn: "1d"
    }
}