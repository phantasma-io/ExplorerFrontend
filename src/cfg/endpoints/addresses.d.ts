interface Address {
  address?: string;
  address_name?: string;
}

interface AddressParams extends ListParams, Address {}

interface AddressResults extends ListResults {
  addresses?: Address[];
}
