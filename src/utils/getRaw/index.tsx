const stubs = import.meta.glob('../../../resources/stubs/*.(stub)', {
  as: 'raw',
});
const modules = {
  ...stubs,
};

export const getRaw = (path: string) => {
  for (let key in modules) {
    if (key.match(path)) {
      return modules[key]();
    }
  }

  return '';
};
