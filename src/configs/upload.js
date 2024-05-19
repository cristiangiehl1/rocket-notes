const path  = require("path");

/*
    A biblioteca Multer é comumente utilizada em aplicativos web Node.js 
    para lidar com o upload de arquivos, especialmente arquivos de mídia, 
    como imagens, vídeos e áudios. Essa biblioteca facilita o 
    processamento de arquivos enviados por formulários HTML, permitindo o 
    armazenamento desses arquivos em servidores ou em serviços de 
    armazenamento na nuvem, como Amazon S3 ou Google Cloud Storage.
*/
const multer = require("multer");

/*
    biblioteca crypto em Node.js é usada para fornecer funcionalidades de 
    criptografia e segurança em aplicativos JavaScript. Ela oferece uma 
    variedade de métodos para realizar operações criptográficas, como 
    hash de dados, criptografia simétrica e assimétrica, 
    geração de números aleatórios e muito mais.
*/
const crypto = require("crypto");
const { log } = require("console");


const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");


const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            /*
                o nosso file possui as seguintes propriedades:
                {
                    fieldname: nome do campo definido no formulário.
                    Nesse caso seria 'avatar',
                    originalname: nome do arquivo no desktop do usuário.
                    Nesse caso seria 'foto_perfil_trabalho',
                    encoding: Value of the `Content-Transfer-Encoding` 
                    header for this file.
                    Nesse caso seria '7bit,
                    mimetype: o tipo de arquivo.
                    Nesse caso seria image/jpeg.
                }

                estamos alocando no fileName o nome do nosso arquivo 
                encriptado. 
                
            */ 
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}
