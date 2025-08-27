const API_ROOT = import.meta.env.MODE === 'production' ? 'https://api.dotynote.com/api' : '/api';

export const getBaseApi = () => {
  return `${API_ROOT}/v1`;
};
