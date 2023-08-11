import apiFactory, { Api } from './apiFactory';

function createApi() {
  const api = apiFactory();

  return createRoutes(api);
}

const createRoutes = (api: Api) => {
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

    async loadNote(id: string): Promise<string> {
      return api.get(`/notes/${id}`);
    },

    async loadNotes(params): Promise<string[]> {
      return api.get('/notes', params);
    },
    
    async loadPosts(noteId, params): Promise<string[]> {
      return api.get(`/notes/${noteId}/posts`, params);
    },
  };
};

export default createApi();
