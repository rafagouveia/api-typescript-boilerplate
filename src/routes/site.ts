import { Request, Response } from 'express';
import Router from '../app/router';



Router.get('/site', (req: Request, res: Response) => {
   return res.json({status: 'tua mãe', message: 'tua mãe caiu na pica'});
})
