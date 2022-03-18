import { ExplorerRoutes } from './routes';

export type DetailsLinkOptions = {
  route: ExplorerRoutes;
  key: string;
  title: string;
  primary?: boolean;
};

export interface DetailsItem {
  id: string;
  label: string;
  type:
    | 'text'
    | 'number'
    | 'link'
    | 'date'
    | 'boolean'
    | 'monospace'
    | 'script';
  linkOptions?: DetailsLinkOptions;
}

export type DetailsValue = string | number | boolean | Date;
