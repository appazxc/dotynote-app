import apiFactory from './apiFactory';

function createApi() {
  const api = apiFactory();

  return createRoutes(api);
}

const createRoutes = (api) => {
  return {
    async sendCodeEmail(email: string) {
      return api.post('/auth/send-code-email', { email });
    },

    async loginEmail(data: { email: string, code: string }): Promise<{ token: string }> {
      return api.post('/auth/login-email', data);
    },

    async loadMe(): Promise<{ name: string }> {
      return api.get('/users/me');
    },

    async loadAppSession(): Promise<string> {
      return api.get('/app/session');
    },

    async loadUserSpace(id: string): Promise<string> {
      return api.get(`/spaces/${id}`);
    },

    async loadSpaceTabs(id: string): Promise<string[]> {
      return api.get(`/spaces/${id}/tabs`);
    },
  };
};

export default createApi();
