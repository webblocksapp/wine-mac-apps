import { CommonObject } from '@interfaces';

export const classToClassList = (className?: string) => {
  const obj: CommonObject = {};
  className?.split(' ')?.forEach((item) => {
    obj[item] = true;
  });
  return obj;
};
