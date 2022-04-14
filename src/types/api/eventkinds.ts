import { ListParams, ListResults } from './list';

export type EventKinds =
  | 'AddressMigration'
  | 'AddressRegister'
  | 'AddressUnregister'
  | 'ChainSwap'
  | 'ContractDeploy'
  | 'ContractUpgrade'
  | 'Crowdsale'
  | 'CrownRewards'
  | 'Custom'
  | 'FileCreate'
  | 'FileDelete'
  | 'GasEscrow'
  | 'GasPayment'
  | 'Inflation'
  | 'Infusion'
  | 'Log'
  | 'OrderBid'
  | 'OrderCancelled'
  | 'OrderCreated'
  | 'OrderFilled'
  | 'OrganizationAdd'
  | 'OrganizationCreate'
  | 'OrganizationRemove'
  | 'OwnerAdded'
  | 'OwnerRemoved'
  | 'PlatformCreate'
  | 'TokenBurn'
  | 'TokenClaim'
  | 'TokenCreate'
  | 'TokenMint'
  | 'TokenReceive'
  | 'TokenSend'
  | 'TokenStake'
  | 'ValidatorElect'
  | 'ValidatorRemove'
  | 'ValueCreate'
  | 'ValueUpdate';

export interface EventKind {
  kind?: EventKinds;
}

export interface EventKindParams extends ListParams {
  event_kind?: string;
}

export interface EventKindResults extends ListResults {
  eventKinds?: EventKind[];
}
