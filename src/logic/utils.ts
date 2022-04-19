import { format } from "date-fns";

export const formatDate = (date: string, dateFormat: string) => {
  return format(new Date(date), dateFormat);
};

export const getModifiedValues = (values: any, initialValues: any) => {
  let modifiedValues: any = {};

  if (values) {
    Object.entries(values).forEach((entry) => {
      let key = entry[0];
      let value = entry[1];

      if (value !== initialValues[key]) {
        modifiedValues[key as any] = value;
      }
    });
  }

  return Object.keys(modifiedValues).length === 0 ? null : modifiedValues;
};

export const countProperty = (data: any[], value: string, propGetter: (item: any) => any) => {
  return data.filter((item) => propGetter(item) === value).length;
};

export type ParameterType = {
  [key: string]: string | number | boolean | null | undefined;
};

export const generateQuery = (params: ParameterType) => {
  const queryArray = [];
  let paramValue: any = "";

  for (const paramName in params) {
    paramValue = params[paramName];

    if (paramValue !== null && paramValue !== undefined && paramValue !== "") {
      queryArray.push(`${paramName}=${paramValue}`);
    }
  }

  return queryArray.join("&");
};

export const sleep = (ms: number = 100) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// export const groupBy = (xs: any, key: any) => {
//   return xs.reduce((rv: any, x: any) => {
//     (rv[x[key]] = rv[x[key]] || []).push(x);
//     return rv;
//   }, {});
// };
/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
  const map = new Map<K, Array<V>>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
