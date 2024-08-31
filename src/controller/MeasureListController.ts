import {Request, Response} from 'express';
import { MeasureListService } from '../services/MeasureListService';

class MeasureListController{
    async handle(req: Request, res: Response){
        const {measure_type} = req.body;

        const measureToLC = measure_type.toLowerCase();

        const measureList = new MeasureListService();

        const measure = await measureList.execute({
            measure_type: measureToLC
        })

        return res.json(measure)
    }
}

export {MeasureListController}