export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
};
