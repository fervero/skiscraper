import { Breadcrumb, Coordinates, PaginatedResponse } from './models';

interface CommonResortProperties {
  id: number;
  name: string;
  country: string;
  totalSlopes: number;
  blueSlopes: number;
  blackSlopes: number;
  redSlopes: number;
  price: number;
  region: string;
  mainLink: string;
  placeId?: string;
}

export interface APIResort extends CommonResortProperties {
  breadcrumbs1: string;
  breadcrumbs2?: string;
  breadcrumbs3?: string;
}

export interface APIResorts extends PaginatedResponse {
  resorts: APIResort[];
}

export interface Resort extends CommonResortProperties, Coordinates {
  breadcrumbs1: Breadcrumb[];
  breadcrumbs2?: Breadcrumb[];
  breadcrumbs3?: Breadcrumb[];
}

export interface ResortsPaginatedResponse extends PaginatedResponse {
  resorts: Resort[];
}
