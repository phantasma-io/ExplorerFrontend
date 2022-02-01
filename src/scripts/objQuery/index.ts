type ObjectType = {
  [x: string]: string | number;
};

/**
 * ObjToQueryType
 */
type ObjToQueryType = <T>(obj: T | ObjectType) => string;

/**
 * objToQuery
 */
export const objToQuery: ObjToQueryType = (obj) => {
  let str = '?';

  Object.entries(obj).forEach((entry) => {
    str += `${entry[0]}=${entry[1]}&`;
  });

  str = str.substring(0, str.length - 1);

  return str;
};

/**
 * QueryToObjType
 */
type QueryToObjType = (str: string) => ObjectType;

/**
 * queryToObj
 */
export const queryToObj: QueryToObjType = (str) => {
  const obj: ObjectType = {};

  const newStr = str.startsWith('?') ? str.substring(1, str.length) : str;

  newStr.split('&').forEach((propStr) => {
    const prop = propStr.split('=');
    const [key, value] = prop;
    obj[key] = value;
  });

  return obj;
};
