type ObjectType = Record<string, string | number | boolean | undefined | null>;

type ObjToQueryType = <T>(obj: T | ObjectType) => string;

export const objToQuery: ObjToQueryType = (obj) => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, val]) => {
    if (val === undefined || val === null) {
      return;
    }
    params.append(key, String(val));
  });

  const query = params.toString();
  return query ? `?${query}` : '';
};

type QueryToObjType = (str: string) => ObjectType;

export const queryToObj: QueryToObjType = (str) => {
  const obj: ObjectType = {};
  const clean = str.startsWith('?') ? str.substring(1) : str;
  const params = new URLSearchParams(clean);

  params.forEach((value, key) => {
    obj[key] = value;
  });

  return obj;
};
