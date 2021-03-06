import { Request, Response } from 'express';
import path from 'path';

const pathToDist = path.join(__dirname, '..', '..', 'dist', 'skiscraper-front');

export const indexEndpoint = (req: Request, res: Response) =>
  res.sendFile('index.html', { root: pathToDist });
