interface EventKind {
  kind?: string;
}

interface EventKindParams extends ListParams {
  event_kind?: string;
}

interface EventKindResults extends ListResults {
  eventKinds?: EventKind[];
}
