import { ListParams, ListResults, WithOption } from './list';

export interface Platform {
  name?: string;
  chain?: string;
  fuel?: string;
}

export interface PlatformParams extends ListParams {
  name?: string;
  with_external?: WithOption;
  with_interops?: WithOption;
  with_token?: WithOption;
}

export interface PlatformResults extends ListResults {
  platforms?: Platform[];
}
