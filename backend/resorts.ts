import { Request, Response } from 'express';
import mockResorts from './mock-data/mock-resorts';

export const resorts = (req: Request, res: Response) => res.send(mockResorts);
