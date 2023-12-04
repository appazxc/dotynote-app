export const arrayMaxBy = (array, getter, defaultValue = 0) => {
  return array.reduce((acc, item) => {
    return getter(item) > acc ? getter(item) : acc;
  }, [defaultValue]);
};