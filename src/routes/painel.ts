import { Request, Response } from 'express';
import Router from '../app/router';



Router.get('/home', (req: Request, res: Response) => {
   return res.json({status: 'tua mãe', message: 'tua mãe caiu na pica'});
})



Router.get('/painel', (req: Request, res: Response) => {
    return res.json({status: 'puta', message: 'ja comi'});
 })