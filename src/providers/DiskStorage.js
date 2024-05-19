const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");


class DiskStorage {
    async saveFile(file) {

        /*
             a função 'rename' da biblioteca 'js' é responsável por mudar
             de pasta o arquivo da imagem de perfil do usuário.
        */ 
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )
        return file;
    };


    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
        
        try {
            // 
            await fs.promises.stat(filePath);
            

        } catch {
            return;
        }
        /*
            a função 'unlink' é responsável por deletar o arquivo da pasta
            temporária TMP_FOLDER.
        */ 
        await fs.promises.unlink(filePath);
    };
}

module.exports = DiskStorage;