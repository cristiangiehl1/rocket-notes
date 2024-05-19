const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");


function ensureAuthenticated(request, reponse, next) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("JWT Token não informado", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        /*
            o verify nos restorna um objeto contendo as propriedades passadas
            no SessionController para dentro do token.
            Como passamos no subject apenas o user_id (como umas tring)
            se acessarmos o { sub } ou subject conseguimos resgatar o valor
            do user_id. 
        */         const { sub: user_id } = verify(token, authConfig.jwt.secret);

       
        request.user = {
            id: Number(user_id),
        };

        return next();
    }
    catch {
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;