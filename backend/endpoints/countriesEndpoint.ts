import {Request, Response} from 'express';
import mockCountries from '../mock-data/mock-countries';
import {Resort} from '../sql-driver';

const heroku = process.env.ENVIRONMENT === 'heroku';

const staticCountries = (req: Request, res: Response) =>
  res.send(mockCountries);


// FIXME don't use `any`
const selectDistinct = (model: any, field: string) =>
  model
    .aggregate(field, 'DISTINCT', {plain: false})
    .then((response: any) =>
      (response as any[]).map(({DISTINCT}) => DISTINCT)
    );

const dbCountries = (req: Request, res: Response) => {
  selectDistinct(Resort, 'country')
    .then((result: string[]) => res.send(result))
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving resorts.',
      });
    });
};

export const countriesEndpoint = dbCountries;
