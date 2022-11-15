export const strReplacer = (
  text: string,
  dictionary: { [x: string]: string }
) => {
  for (let key of Object.keys(dictionary)) {
    text = text.replace(new RegExp(`{{${key}}}`, 'g'), dictionary[key]);
  }

  return text;
};
