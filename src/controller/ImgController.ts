import { Request, Response } from 'express';
import fs from 'fs';
import { ImgService } from '../services/ImgService';

class ImgController {
    async handle(req: Request, res: Response) {

        const {measure_type} = req.body;

        if (!req.file) {
            throw new Error("error upload file")
        } else {
            const { originalname ,path } = req.file;

            const imgPath = path;//caminho da imagem
            //console.log(path)

            const extracteValue = await ImgService(
                imgPath,
                measure_type
            );

            // Deleta a imagem temporária após o processamento
            //fs.unlinkSync(imgPath);

            return res.json(extracteValue)
        }
    }
}

export { ImgController }