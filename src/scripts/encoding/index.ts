import { TableParams } from '../../types/table';

type EncodeParams = (params: TableParams) => string;

export const encode: EncodeParams = (params) => btoa(JSON.stringify(params));

type DecodeParams = (str: string) => TableParams;

export const decode: DecodeParams = (str) => JSON.parse(atob(str));
