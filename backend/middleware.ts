import express, { Request, Response } from 'express';
import path from 'path';

type callback = (argument?: any) => void;

export function requireHTTPS(
  req: Request,
  res: Response,
  next: callback
): void {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }

  next();
}

const pathToDist = path.join(__dirname, '..', 'dist', 'skiscraper-front');
const serveStaticFiles = express.static(pathToDist);

export const middleware = [requireHTTPS, serveStaticFiles];
