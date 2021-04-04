import { Request, Response } from 'express';
import mockCountries from './mock-data/mock-countries';

export const countries = (req: Request, res: Response) =>
  res.send(mockCountries);
