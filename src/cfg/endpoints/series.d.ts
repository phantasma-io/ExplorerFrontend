interface Series {
  id?: string;
  creator?: string;
  current_supply?: number;
  max_supply?: number;
  mode_name?: string;
  name?: string;
  description?: string;
  image?: string;
  royalties?: string;
  type?: number;
  attrType1?: string;
  attrValue1?: string;
  attrType2?: string;
  attrValue2?: string;
  attrType3?: string;
  attrValue3?: string;
}

interface SeriesParams extends ListParams {
  id?: string;
  creator?: string;
  name?: string;
  chain?: string;
  contract?: string;
  symbol?: string;
}

interface SeriesResults extends ListResults {
  series?: Series[];
}
