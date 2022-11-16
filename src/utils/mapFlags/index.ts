export const mapFlags = <T extends { [key: string]: any }>(
  data: T,
  map: { [K in keyof T]: `-${string}` | `--${string}` }
): string => {
  let flags = '';

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (typeof value === 'boolean' && value) {
      flags += `${map[key] || ''} `;
    }
  });

  return flags.slice(0, -1);
};
