const knex = require("../database/knex");

const AppError = require("../utils/AppError");

/*
    Composição de um Token JWT (Jason Web Token):
    HEADER: {
        "algoritmo": "HS256",
        "token": "JWT"
    }
    PAYLOAD - contém o conteúdo do token {
        "sub": "1234567890",
        "name": "John Doe",
        "iat": 1516239022
    }
    VERIFY SIGNATURE - garante a integridade do token
    
    Precisamos utilizar a biblioteca JSONWEBTOKEN
    > npm install jsonwebtoken

    { sign } é um método que está dentro da lib do jsonwebtoken.
*/
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

const { compare } = require("bcryptjs");

class SessionController {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await knex("users")
            .where({ email }).first();

        if(!user) {
            throw new AppError("E-mail e/ou senha incorretos.", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorretos.", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        
        /*
            criamos o token utilizando o método sign() devemos passar
            os seguintes parâmetros:
            - {} - um objeto vazio.
            - a chave secreta do token.
            - 'subject' que é o conteúdo que queremos inserir dentro do token,
            como exemplo, os dados do usuário.
        */
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user, token });
    }

    async delete(request, response) {

    }

    
}

module.exports = SessionController;