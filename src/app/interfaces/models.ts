export interface APIPaginationParams {
  size: number;
  page: number;
}

export interface APIFilterParams {
  country?: string;
  region?: string;
}

export interface APISortParams {
  sort: string;
}

export type APIQueryParams = APIPaginationParams & APIFilterParams;

export interface Breadcrumb {
  text: string;
  href: string;
}

export interface PaginatedResponse {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface GeocodingData {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
}

export interface GoogleApiGeocodingResponse {
  results: GeocodingData[];
}

export interface Coordinates {
  latitude?: string;
  longitude?: string;
}
