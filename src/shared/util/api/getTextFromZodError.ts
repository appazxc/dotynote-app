import { ZodIssue } from 'zod';

const codes = {
  tooBig: 'too_big',
};

const getTextFromCode = (code: string): string => {
  switch(code) {
  case codes.tooBig:
    return 'is too big';
  default:
    throw Error('unhandled zod code: ' + code);
    return 'unknown error';
  }
};

export const getTextFromZodError = (error?: ZodIssue) => {
  if (!error || !error.path[0]) {
    return null;
  }

  const { code, path } = error;
  const pathString = String(path[0]);
  const text = getTextFromCode(code);
  const result = `${pathString}${pathString ? ' ': ''}${text}`;

  return result[0].toUpperCase() + result.slice(1);
};