// importando o router de dentro do próprio express
const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

// importando o middleware criado para buscar o token do usuário.
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

/*
    'usersRoutes.use(myMiddleware)' 
        => coloca o middleware para todas as rotas.
*/ 

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

// o método HTTP patch é quando você quer atualizar um campo específico.
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);

// exportando pra quem quiser acessar o arquivo
module.exports = usersRoutes;