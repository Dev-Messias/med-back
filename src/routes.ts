import {Router, Request, Response} from 'express';
import multer from 'multer';

import { ImgController } from './controller/ImgController';
import { MeasureListController } from './controller/MeasureListController';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload('./uploads'))

router.post('/upload', upload.single('file'), new ImgController().handle )
router.get('/list',  new  MeasureListController().handle )

export {router};