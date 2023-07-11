import apiFactory from './apiFactory';

function createApi() {
  const api = apiFactory();

  return createRoutes(api);
}

const createRoutes = (api) => {
  return {
    async loginEmail(email: string) {
      return api.post('/auth/email', { email });
    },

    async loginEmailWithCode(data: { email: string, code: string }): Promise<{ token: string }> {
      return api.post('/auth/email-with-code', data);
    },

    async getMe(): Promise<{ name: string }> {
      return {
        name: 'Dima',
      };
    },
  };
};

export default createApi();
