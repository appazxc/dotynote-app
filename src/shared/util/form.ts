export const hasServerError = (errors) => {
  return !!errors.root?.serverError;
};

export const getServerErrorMessage = (errors) => {
  return errors.root?.serverError?.message;
};
