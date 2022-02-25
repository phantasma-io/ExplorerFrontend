import { ListParams, ListResults } from './list';

export interface EventKind {
  kind?: string;
}

export interface EventKindParams extends ListParams {
  event_kind?: string;
}

export interface EventKindResults extends ListResults {
  eventKinds?: EventKind[];
}
