import {Request, Response} from 'express';
import mockResorts from '../mock-data/mock-resorts';
import {Op, OrderItem} from 'sequelize';
import {Resort} from '../sql-driver';

const DEFAULT_PAGE_SIZE = 25;
const heroku = process.env.ENVIRONMENT === 'heroku';

const getPagination = (
  page: string = '1',
  size: string | number = DEFAULT_PAGE_SIZE
) => ({
  limit: +size,
  offset: (+page - 1) * +size,
});

const getPagingData = (
  data: any,
  page: string | number | undefined,
  limit: string | number
) => {
  const {count: totalItems, rows} = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / +limit);

  return {totalItems, resorts: rows, totalPages, currentPage};
};

const getSortOrder = (queryParam: string) => {
  if (!queryParam) {
    return [];
  }

  const [orderItem, orderDirection] = queryParam.split(',');
  return [[orderItem, orderDirection] as OrderItem];
};

const buildFilterClause = ({query}: Request, property: string) => {
  const value: string = (query[property] as string) || '';
  const valueArray = value.split(',');

  const clausesArray = valueArray.map((name) => ({
    [property]: {
      [Op.like]: `%${name}%`,
    },
  }));

  return query[property]
    ? {
      [Op.or]: clausesArray,
    }
    : {};
};

const buildFiltersQuery = (req: Request) => {
  const filterableProperties = ['country', 'region'];

  const filters = filterableProperties.map((property) =>
    buildFilterClause(req, property)
  );

  return filters.reduce((acc, curr) => ({...acc, ...curr}), {});
};

const dbResorts = (req: Request, res: Response): void => {
  const {page, size, sort} = req.query;

  const condition = buildFiltersQuery(req);

  const {limit, offset} = getPagination(page as string, size as string);

  const query = {
    where: condition,
    limit,
    offset,
    order: getSortOrder(sort as string),
  };

  Resort.findAndCountAll(query)
    .then((data) => {
      const response = getPagingData(data, page as string, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving resorts.',
      });
    });
};

export const resortsEndpoint = heroku ? (req: Request, res: Response) => res.send(mockResorts) : dbResorts;
