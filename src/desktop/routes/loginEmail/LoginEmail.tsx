import { Logo } from 'shared/components/Logo';
import { LoginEmailContent } from 'shared/modules/loginEmail/LoginEmailContent';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';
import { loginEmail } from 'desktop/routes/loginEmail';

function LoginEmail() {
  const { email, token } = loginEmail.useSearch();

  return (
    <Layout header={<LayoutHeader left={<DesktopLink to="/"><Logo p="2" /></DesktopLink>} />}>
      <LoginEmailContent email={email} token={token} />
    </Layout>
  );
}

export { LoginEmail };
