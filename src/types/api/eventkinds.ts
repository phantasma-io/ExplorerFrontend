import { ListParams, ListResults } from './list';

export type EventKinds =
  | 'AddressMigration'
  | 'AddressRegister'
  | 'AddressUnregister'
  | 'ChainSwap'
  | 'ChainCreate'
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
  | 'OrderClosed'
  | 'OrganizationAdd'
  | 'OrganizationCreate'
  | 'OrganizationRemove'
  | 'ValidatorPropose'
  | 'ValidatorSwitch'
  | 'OwnerAdded'
  | 'OwnerRemoved'
  | 'PlatformCreate'
  | 'GovernanceSetGasConfig'
  | 'GovernanceSetChainConfig'
  | 'LeaderboardCreate'
  | 'TokenBurn'
  | 'TokenClaim'
  | 'TokenCreate'
  | 'TokenSeriesCreate'
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
