import { TableUrlParams } from 'types/table';

type EncodeParams = (params: TableUrlParams) => string;

export const encode: EncodeParams = (params) => btoa(JSON.stringify(params));

type DecodeParams = (str: string) => TableUrlParams;

export const decode: DecodeParams = (str) => JSON.parse(atob(str));
