import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const snakeToCamel = (obj: any): any => {
  if (obj instanceof Array) {
    return obj.map((v) => snakeToCamel(v));
  } else if (obj instanceof Object) {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      newObj[key.replace(/(_\w)/g, (k) => k[1].toUpperCase())] =
        obj[key] instanceof Object ? snakeToCamel(obj[key]) : obj[key];
    });
    return newObj;
  } else {
    return obj;
  }
};

export const camelToSnake = (obj: any): any => {
  if (obj instanceof Array) {
    return obj.map((v) => camelToSnake(v));
  } else if (obj instanceof Object) {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      newObj[key.replace(/([A-Z])/g, (k) => `_${k.toLowerCase()}`)] =
        camelToSnake(obj[key]);
    });
    return newObj;
  } else {
    return obj;
  }
};
