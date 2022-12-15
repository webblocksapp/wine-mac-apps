import { CommonObject } from '@interfaces';

export const strReplacer = <T extends CommonObject>(
  text: string,
  dictionary: T
) => {
  for (let key of Object.keys(dictionary)) {
    text = text.replace(new RegExp(`{{${key}}}`, 'g'), dictionary[key] || '');
  }

  return text;
};
