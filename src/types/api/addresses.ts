import { ListParams, ListResults } from './list';

export interface Address {
  address?: string;
  address_name?: string;
}

export interface AddressParams extends ListParams, Address {}

export interface AddressResults extends ListResults {
  addresses?: Address[];
}
