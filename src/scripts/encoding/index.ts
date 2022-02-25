import { TableUrlParams } from 'types/table';

type ObjParams = {
  [x: string]: string | number;
};

type Params = ObjParams | TableUrlParams;

type EncodeParams = (params: Params) => string;

export const encode: EncodeParams = (params) => btoa(JSON.stringify(params));

type DecodeParams = (str: string) => Params;

export const decode: DecodeParams = (str) => JSON.parse(atob(str));
