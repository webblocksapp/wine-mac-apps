export const capitalize = (text: string) => {
  const arrText = text.split(' ');
  return arrText
    .map((word) => word?.[0]?.toUpperCase() + word?.substring?.(1))
    .join(' ');
};
